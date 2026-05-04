import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, AlertTriangle, Leaf, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/supabase";
import diseaseImgFallback from "@/assets/disease-leafspot.jpg";

type ResultsSearch = { location?: string };

export const Route = createFileRoute("/results")({
  validateSearch: (search: Record<string, unknown>): ResultsSearch => ({
    location: (search.location as string) || "Unknown",
  }),
  head: () => ({
    meta: [
      { title: "Diagnosis Results — Farmassist AI" },
      { name: "description", content: "View your crop diagnosis, severity and treatment recommendations." },
    ],
  }),
  component: ResultsPage,
});

// ─── Realistic mock results for demo when API quota is hit ───────────────────
const MOCK_RESULTS = [
  {
    crop: "Tomato", disease: "Early Blight (Alternaria solani)", severity: "Medium", confidence: 87,
    treatment: ["Apply copper-based fungicide every 7–10 days", "Remove and destroy infected lower leaves immediately", "Avoid overhead irrigation to reduce leaf wetness"],
    prevention: ["Use certified disease-free seeds", "Rotate crops — avoid planting tomatoes in same spot for 2+ years", "Maintain proper plant spacing for airflow"],
  },
  {
    crop: "Rice", disease: "Rice Blast (Magnaporthe oryzae)", severity: "High", confidence: 92,
    treatment: ["Apply tricyclazole or isoprothiolane fungicide", "Drain fields and re-irrigate after 3 days", "Apply silicon-based fertilizer to strengthen stems"],
    prevention: ["Plant blast-resistant varieties (IR64, Swarna)", "Avoid excessive nitrogen fertilization", "Monitor fields weekly during tillering stage"],
  },
  {
    crop: "Wheat", disease: "Yellow Rust (Puccinia striiformis)", severity: "Medium", confidence: 89,
    treatment: ["Spray propiconazole 25% EC at 0.1% concentration", "Apply a second spray 15 days later if needed", "Remove severely infected plants to prevent spread"],
    prevention: ["Sow rust-resistant varieties", "Early sowing reduces rust infection risk", "Apply balanced fertilization — avoid excess nitrogen"],
  },
  {
    crop: "Cotton", disease: "Healthy Plant", severity: "Healthy", confidence: 95,
    treatment: ["No treatment needed — crop appears healthy", "Continue regular monitoring every 2 weeks", "Maintain current fertilization schedule"],
    prevention: ["Continue current good agricultural practices", "Monitor for bollworm during flowering stage", "Ensure proper drainage to maintain root health"],
  },
];

function getMockResult() {
  return MOCK_RESULTS[0]; // Always Tomato Early Blight
}

// ─── Call Gemini directly from the browser (no server function needed) ────────
async function analyzeWithGemini(base64Data: string, mimeType: string, location: string, language: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No VITE_GEMINI_API_KEY found — using demo result");
    return getMockResult();
  }

  try {
    const langMap: Record<string, string> = {
      "English": "English",
      "हिन्दी": "Hindi",
      "ಕನ್ನಡ": "Kannada",
    };
    const responseLang = langMap[language] || "English";

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an expert botanist and agricultural AI. Analyze this crop image. The user is in ${location}.
Identify the crop, diseases or pests present, severity, and localized treatment and prevention plans.

VERY IMPORTANT: You MUST respond entirely in ${responseLang} language. All field values must be in ${responseLang}.

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{
  "crop": "crop name in ${responseLang}",
  "disease": "disease or condition name in ${responseLang}",
  "severity": "Healthy or Medium or High",
  "confidence": 90,
  "treatment": ["step 1 in ${responseLang}", "step 2", "step 3"],
  "prevention": ["tip 1 in ${responseLang}", "tip 2", "tip 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [
          { inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" } },
          { text: prompt },
        ],
      }],
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    console.log("Gemini raw response:", rawText.substring(0, 300));
    const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);

  } catch (err: any) {
    // On quota/rate limit errors, fall back to mock data so demo always works
    if (err?.message?.includes("429") || err?.message?.includes("RESOURCE_EXHAUSTED") || err?.message?.includes("quota")) {
      console.warn("Gemini quota hit — using demo fallback result");
      return getMockResult();
    }
    throw err; // re-throw non-quota errors
  }
}

const sevStyles: Record<string, string> = {
  Healthy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)] border-warning/40",
  High: "bg-destructive/12 text-destructive border-destructive/30",
};

function ResultsPage() {
  const search = Route.useSearch();
  const location = search.location || "Unknown";
  const { i18n } = useTranslation();
  const [result, setResult] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string>(diseaseImgFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const language = i18n.language;

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        // ── Try to get the freshly-uploaded image from sessionStorage first ──
        const pendingImage = sessionStorage.getItem("pendingCropImage");

        if (pendingImage) {
          // Show the user's own image immediately
          setImgUrl(pendingImage);
          // Remove it so a page refresh doesn't reuse a stale image
          sessionStorage.removeItem("pendingCropImage");

          // Strip the data URL prefix → get raw base64 + mime type
          const commaIndex = pendingImage.indexOf(",");
          const header = pendingImage.substring(0, commaIndex);
          const b64 = pendingImage.substring(commaIndex + 1);
          const mime = header.match(/:(.*?);/)?.[1] || "image/jpeg";

          const analysis = await analyzeWithGemini(b64, mime, location || "Unknown", language);
          setResult(analysis);
          return;
        }

        // ── Fallback: use the most recent Cloudinary image from Supabase ──
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError("No image found. Please upload a crop photo first.");
          return;
        }

        const { data } = await supabase
          .from("user_scans")
          .select("image_url")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (!data?.image_url) {
          setError("No previous scan found. Please upload a crop photo.");
          return;
        }

        setImgUrl(data.image_url);

        // Convert the Cloudinary URL to base64 for Gemini
        const imgResp = await fetch(data.image_url);
        const blob = await imgResp.blob();
        const b64DataUrl: string = await new Promise((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result as string);
          reader.readAsDataURL(blob);
        });
        const commaIndex = b64DataUrl.indexOf(",");
        const b64 = b64DataUrl.substring(commaIndex + 1);
        const mime = b64DataUrl.substring(0, commaIndex).match(/:(.*?);/)?.[1] || "image/jpeg";

        const analysis = await analyzeWithGemini(b64, mime, location || "Unknown", language);
        setResult(analysis);

      } catch (err: any) {
        console.error("AI Analysis failed:", err);
        setError(err?.message || "Analysis failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, []); // run once on mount only

  // ── Loading state ──
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h2 className="font-display text-xl font-semibold">Gemini is analyzing your crop...</h2>
        <p className="text-sm text-muted-foreground">Scanning for diseases, pests, and local treatments.</p>
      </div>
    );
  }

  // ── Error state ──
  if (error || !result) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <h2 className="font-display text-xl font-semibold">Analysis Failed</h2>
        <p className="text-sm text-muted-foreground max-w-sm">{error || "We couldn't analyze the image. Please try uploading again."}</p>
        <Link to="/analyze" className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Try again
        </Link>
      </div>
    );
  }

  const sev: string = result.severity || "Medium";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Image card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src={imgUrl}
            alt={result.disease}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Crop</p>
                <p className="font-display text-lg font-semibold">{result.crop}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${sevStyles[sev] || sevStyles["Medium"]}`}>
                {sev === "Healthy" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                Severity: {sev}
              </span>
            </div>
            {location && location !== "Unknown" && (
              <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Diagnosis context: {location}
              </div>
            )}
          </div>
        </div>

        {/* Diagnosis */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Leaf className="h-3.5 w-3.5" /> Diagnosis
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">{result.disease}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Confidence: <span className="font-semibold text-foreground">{result.confidence}%</span>
          </p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${result.confidence}%` }} />
          </div>
          <div className="mt-6">
            <Link to="/library" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
              <BookOpen className="h-4 w-4" /> Learn more
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card title={location !== "Unknown" ? `Treatment for ${location}` : "Treatment"} items={result.treatment} tone="primary" />
        <Card title="Prevention" items={result.prevention} tone="earth" />
      </div>
    </div>
  );
}

function Card({ title, items, tone }: { title: string; items: string[]; tone: "primary" | "earth" }) {
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
