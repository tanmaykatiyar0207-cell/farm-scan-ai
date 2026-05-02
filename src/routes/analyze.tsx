import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload, Camera, X, Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze Crop — Farmassist AI" },
      { name: "description", content: "Upload or capture a crop image and let AI diagnose disease in seconds." },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const camRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/results" }), 2200);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Diagnosis
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Analyze your crop</h1>
        <p className="mt-2 text-sm text-muted-foreground">Upload a clear photo of the leaf or affected area.</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`mt-8 rounded-3xl border-2 border-dashed bg-card p-6 transition-colors sm:p-10 ${
          dragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        {preview ? (
          <div className="space-y-4">
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
              {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Analyzing your crop…</>) : (<><Sparkles className="h-5 w-5" /> Analyze Crop</>)}
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
          <Loader2 className="h-4 w-4 animate-spin" /> AI is examining leaves, color, and texture…
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your images stay private. Used only to generate diagnosis.
      </p>
    </div>
  );
}
