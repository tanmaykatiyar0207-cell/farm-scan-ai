import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, AlertTriangle, Leaf, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { analyzeWithGemini, getMockResult, type AnalysisResult } from "@/lib/gemini";
import { transliterate } from "@/lib/transliterate";
import diseaseImgFallback from "@/assets/disease-leafspot.jpg";

type ResultsSearch = { location?: string; hint?: string };

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): ResultsSearch => ({
    location: (search.location as string) || "Unknown",
    hint: (search.hint as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Diagnosis Results — Farmassist AI" },
      { name: "description", content: "View your crop diagnosis, severity and treatment recommendations." },
    ],
  }),
  component: ResultsPage,
});

const sevStyles: Record<string, string> = {
  Healthy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)] border-warning/40",
  High: "bg-destructive/12 text-destructive border-destructive/30",
};

function ResultsPage() {
  const search = Route.useSearch();
  const location = search.location || "Unknown";
  const { i18n } = useTranslation();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [displayResult, setDisplayResult] = useState<AnalysisResult | null>(null);
  const [imgUrl, setImgUrl] = useState<string>(diseaseImgFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transliterating, setTransliterating] = useState(false);
  const [hasRun, setHasRun] = useState(false);


  useEffect(() => {
    if (hasRun) return;
    
    const runAnalysis = async () => {
      try {
        setHasRun(true);
        let currentImg = sessionStorage.getItem("pendingCropImage");
        let analysisB64 = "";
        let analysisMime = "image/jpeg";

        if (currentImg) {
          setImgUrl(currentImg);
          
          const commaIndex = currentImg.indexOf(",");
          if (commaIndex > -1) {
            const header = currentImg.substring(0, commaIndex);
            analysisB64 = currentImg.substring(commaIndex + 1);
            analysisMime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
          }
        } else {
          // Check Supabase if no session image
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data } = await supabase
              .from("user_scans")
              .select("image_url")
              .eq("user_id", session.user.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .single();

            if (data?.image_url) {
              setImgUrl(data.image_url);
              currentImg = data.image_url;
              
              const imgResp = await fetch(data.image_url);
              const blob = await imgResp.blob();
              const b64DataUrl: string = await new Promise((res) => {
                const reader = new FileReader();
                reader.onload = () => res(reader.result as string);
                reader.readAsDataURL(blob);
              });
              const commaIndex = b64DataUrl.indexOf(",");
              analysisB64 = b64DataUrl.substring(commaIndex + 1);
              analysisMime = b64DataUrl.substring(0, commaIndex).match(/:(.*?);/)?.[1] || "image/jpeg";
            }
          }
        }

        if (!analysisB64) {
          setError("No image found. Please upload a crop photo first.");
          setLoading(false);
          return;
        }

        const hint = search.hint || "";

        // Perform AI analysis on the SERVER
        const analysis = await analyzeWithGemini({ 
          data: { 
            base64Data: analysisB64, 
            mimeType: analysisMime, 
            location,
            hint
          } 
        });
        
        setResult(analysis);

        // --- HACKATHON INTEGRATION: Push to Heatmap (localStorage feed) ---
        if (analysis && !analysis.error && analysis.is_crop_detected && analysis.confidence > 50) {
          const lat = sessionStorage.getItem("pendingLat");
          const lon = sessionStorage.getItem("pendingLon");
          
          if (lat && lon) {
            const newAnalysis = {
              id: `realtime-${Date.now()}`,
              crop: analysis.crop || "Unknown",
              disease: analysis.disease || "Unknown",
              severity: analysis.severity || "Medium",
              lat: parseFloat(lat),
              lon: parseFloat(lon),
              created_at: new Date().toISOString(),
              city: location,
              state: location,
              isRealtime: true
            };
            
            const existing = JSON.parse(localStorage.getItem("communityAnalyses") || "[]");
            localStorage.setItem("communityAnalyses", JSON.stringify([newAnalysis, ...existing].slice(0, 50)));
            console.log("HEATMAP_SYNC: Diagnosis pushed to CropWatch.");
          }
        }
        // -----------------------------------------------------------------
        
      } catch (err: any) {
        console.error("Critical failure in analysis pipeline:", err);
        const hint = search.hint || "";
        setResult(getMockResult(hint));
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [location]);

  // Handle Transliteration when language changes or result arrives
  useEffect(() => {
    if (!result) return;
    
    const applyTransliteration = async () => {
      const lang = i18n.language;
      if (lang === "en") {
        setDisplayResult(result);
        return;
      }

      setTransliterating(true);
      try {
        const trans = { ...result };
        trans.crop = await transliterate(result.crop, lang);
        trans.disease = await transliterate(result.disease, lang);
        trans.symptoms = await transliterate(result.symptoms, lang);
        
        if (result.treatment) {
          trans.treatment = await Promise.all(result.treatment.map((t: string) => transliterate(t, lang)));
        }
        if (result.prevention) {
          trans.prevention = await Promise.all(result.prevention.map((t: string) => transliterate(t, lang)));
        }
        
        setDisplayResult(trans);
      } catch (err) {
        console.error("Transliteration error:", err);
        setDisplayResult(result);
      } finally {
        setTransliterating(false);
      }
    };

    applyTransliteration();
  }, [result, i18n.language]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="font-display text-xl font-semibold">Gemini is analyzing your crop...</h2>
        <p className="text-sm text-muted-foreground">Scanning for diseases, pests, and local treatments.</p>
      </div>
    );
  }

  if (error || !result || (result as any).error) {
    const errorTitle = (result as any)?.error || "Analysis Failed";
    const errorMsg = (result as any)?.details || error || "We couldn't analyze the image. Please try uploading again.";
    
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h2 className="font-display text-xl font-semibold">{errorTitle}</h2>
        <p className="text-sm text-muted-foreground max-w-sm">{errorMsg}</p>
        <Link to="/analyze" className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Try again
        </Link>
      </div>
    );
  }

  const res = displayResult || result;
  if (!res) return null;

  // Handle case where no crop is detected (False Positive removal)
  if (!res.is_crop_detected) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20" />
          <AlertTriangle className="relative h-16 w-16 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold">No Crop Detected</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Our AI couldn't identify a valid plant or crop in this image. 
            Please ensure you're taking a clear, close-up photo of a leaf or plant.
          </p>
        </div>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:brightness-110 transition-all">
            Try again
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent transition-all">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  
  const sev: string = res.severity || "Medium";
  const isLowConfidence = res.confidence < 65;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      {transliterating && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary animate-pulse">
          <Loader2 className="h-3 w-3 animate-spin" /> Translating results to your script...
        </div>
      )}

      {res.isFallback && (
        <div className="mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex gap-3 items-center">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-sm font-medium text-amber-700">
            <span className="font-bold">Demo Mode Active:</span> API limits reached. Showing localized diagnostic simulations.
          </p>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img src={imgUrl} alt={res.disease} className="aspect-[4/3] w-full object-cover" />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Crop</p>
                <p className="font-display text-lg font-semibold">{res.crop}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${sevStyles[sev] || sevStyles["Medium"]}`}>
                {sev === "Healthy" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                Severity: {sev}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Leaf className="h-3.5 w-3.5" /> Diagnosis
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">{res.disease}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Confidence: <span className="font-semibold text-foreground">{res.confidence}%</span>
          </p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all ${isLowConfidence ? "bg-warning" : "bg-primary"}`} style={{ width: `${res.confidence}%` }} />
          </div>

          {isLowConfidence && (
            <div className="mt-4 rounded-xl bg-warning/10 border border-warning/20 p-3 flex gap-3 items-start">
              <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-warning uppercase tracking-wider">Low Confidence</p>
                <p className="text-xs text-[oklch(0.45_0.15_70)] leading-tight mt-0.5">
                  This diagnosis might be inaccurate due to image quality. For better results, take a clearer photo in good lighting.
                </p>
              </div>
            </div>
          )}

          {res.symptoms && (
            <div className="mt-6 rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/70">Observed Symptoms</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 italic">
                "{res.symptoms}"
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/library" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
              <BookOpen className="h-4 w-4" /> Learn more
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <DiagnosisCard title="Treatment" items={res.treatment} tone="primary" />
        <DiagnosisCard title="Prevention" items={res.prevention} tone="earth" />
      </div>
    </div>
  );
}

function DiagnosisCard({ title, items, tone }: { title: string; items: string[]; tone: "primary" | "earth" }) {
  const dot = tone === "primary" ? "bg-primary" : "bg-earth";
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {(items || []).map((t, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className={`mt-2 h-2 w-2 flex-none rounded-full ${dot}`} />
            <span className="text-foreground/90">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
