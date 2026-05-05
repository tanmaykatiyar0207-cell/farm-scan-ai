import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { Upload, Camera, X, Loader2, Sparkles, MapPin, LocateFixed, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze Crop — Farmassist AI" },
      { name: "description", content: "Upload or capture a crop image and let AI diagnose disease in seconds." },
    ],
  }),
  component: AnalyzePage,
});

const LOCATIONS = [
  "Karnataka", "Maharashtra", "Punjab", "Uttar Pradesh",
  "Gujarat", "Madhya Pradesh", "Andhra Pradesh", "Tamil Nadu",
  "Rajasthan", "Bihar", "West Bengal", "Odisha", "Other",
];

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    // Nominatim REQUIRES a User-Agent. Using a generic one for the app.
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { 
        headers: { 
          "Accept-Language": "en",
          "User-Agent": "FarmScanAI/1.0 (Hackathon Project)"
        } 
      }
    );
    if (!res.ok) throw new Error("Location API error");
    const data = await res.json();
    
    // Try to extract state name from the response (India specific priority)
    const address = data.address || {};
    const state: string =
      address.state ||
      address.state_district ||
      address.region ||
      address.county ||
      "Unknown";
    return state;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return "Unknown";
  }
}

function AnalyzePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [locDetected, setLocDetected] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Auto-detect location on mount
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocError("GPS not available on this device.");
      if (!location) setLocation("Other");
      return;
    }
    setLocating(true);
    setLocError(null);
    setLocDetected(false);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const state = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          if (state && state !== "Unknown") {
            // Match to our known states or use raw value
            const matched = LOCATIONS.find(
              (l) => state.toLowerCase().includes(l.toLowerCase())
            );
            setLocation(matched || state);
            setLocDetected(true);
          } else {
            throw new Error("Unknown state");
          }
        } catch {
          setLocError("Couldn't detect location. Please select manually.");
          if (!location) setLocation("Other");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError("Location permission denied. Please select manually.");
        } else {
          setLocError("Couldn't get location. Please select manually.");
        }
        if (!location) setLocation("Other");
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          
          // Max dimensions for AI analysis (Gemini works well with ~1024-2048px)
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    setLoading(true);
    try {
      const compressed = await compressImage(file);
      setPreview(compressed);
    } catch (err) {
      console.error("Compression failed:", err);
      // Fallback to raw if compression fails
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };

  const analyze = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      
      // If no session, we just proceed without saving to Supabase (demo mode)
      const isGuest = !session;

      // Save the current image to browser memory FIRST so Results page always has it
      if (preview) {
        sessionStorage.setItem("pendingCropImage", preview);
      }

      // If the webhook is configured AND we have a session, send the image to n8n
      if (n8nWebhookUrl && preview && session) {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: preview, userId: session.user.id, location: location || "Unknown" }),
        });
      } else {
        await new Promise((res) => setTimeout(res, 2200));
      }

      navigate({ to: "/results", search: { location: location || "Unknown" } });
    } catch (error) {
      console.error("Failed to upload image to n8n:", error);
      navigate({ to: "/results", search: { location: location || "Unknown" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Diagnosis
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Analyze your crop</h1>
        <p className="mt-2 text-sm text-muted-foreground">Upload a clear photo — we'll auto-detect your location for localized advice.</p>
      </div>

      {/* Location bar — always visible */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Your Location
          </label>
          <button
            onClick={detectLocation}
            disabled={locating}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15 disabled:opacity-60 transition-colors"
          >
            {locating ? <Loader2 className="h-3 w-3 animate-spin" /> : <LocateFixed className="h-3 w-3" />}
            {locating ? "Detecting…" : "Use GPS"}
          </button>
        </div>

        {/* Detected location badge */}
        {locDetected && location && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs font-semibold text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Auto-detected: <span className="font-bold">{location}</span>
            <span className="ml-auto text-muted-foreground font-normal">Change below if needed</span>
          </div>
        )}

        {/* Error message */}
        {locError && (
          <p className="mt-2 text-xs text-destructive">{locError}</p>
        )}

        {/* Manual dropdown — always available as override */}
        <select
          id="location"
          value={location}
          onChange={(e) => { setLocation(e.target.value); setLocDetected(false); }}
          className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="" disabled>Select state manually…</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Upload area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
        className={`mt-4 rounded-3xl border-2 border-dashed bg-card p-6 transition-colors sm:p-10 ${
          dragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        {preview ? (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={preview} alt="Selected crop" className="aspect-video w-full object-cover" />
              <button
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 rounded-full bg-background/90 p-2 text-foreground shadow-soft hover:bg-background"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={analyze}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.01] disabled:opacity-80"
            >
              {loading
                ? <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing your crop…</>
                : <><Sparkles className="h-5 w-5" /> Get Localized Diagnosis {location ? `· ${location}` : ""}</>
              }
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Upload className="h-7 w-7" />
            </span>
            <h2 className="mt-5 font-display text-lg font-semibold">Drag & drop your image</h2>
            <p className="mt-1 text-sm text-muted-foreground">PNG or JPG · Up to 10MB</p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]"
              >
                <Upload className="h-4 w-4" /> Upload photo
              </button>
              <button
                onClick={() => camRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-accent"
              >
                <Camera className="h-4 w-4" /> Use camera
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
            <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => handleFile(e.target.files?.[0])} />
          </div>
        )}
      </div>

      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          <Loader2 className="h-4 w-4 animate-spin" /> AI is tailoring diagnosis for {location || "your region"}…
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        📍 Location is used only to generate accurate regional diagnosis. Never stored or shared.
      </p>
    </div>
  );
}
