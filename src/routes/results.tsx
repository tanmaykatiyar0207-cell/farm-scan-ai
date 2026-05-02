import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Share2, BookOpen, CheckCircle2, AlertTriangle, Leaf } from "lucide-react";
import diseaseImg from "@/assets/disease-leafspot.jpg";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Diagnosis Results — Farmassist AI" },
      { name: "description", content: "View your crop diagnosis, severity and treatment recommendations." },
    ],
  }),
  component: ResultsPage,
});

const result = {
  crop: "Tomato",
  disease: "Early Leaf Spot",
  severity: "Medium" as "Healthy" | "Medium" | "High",
  confidence: 92,
  treatment: [
    "Remove and destroy infected leaves to slow spread.",
    "Apply copper-based fungicide every 7–10 days.",
    "Avoid overhead watering — water at the base.",
  ],
  prevention: [
    "Rotate crops every season.",
    "Mulch around plants to reduce soil splash.",
    "Ensure good airflow with proper plant spacing.",
  ],
};

const sevStyles = {
  Healthy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)] border-warning/40",
  High: "bg-destructive/12 text-destructive border-destructive/30",
};

function ResultsPage() {
  const sev = result.severity;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Image card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img src={diseaseImg} alt={result.disease} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Crop</p>
                <p className="font-display text-lg font-semibold">{result.crop}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${sevStyles[sev]}`}>
                {sev === "Healthy" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                Severity: {sev}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Leaf className="h-3.5 w-3.5" /> Diagnosis
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">{result.disease}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Confidence: <span className="font-semibold text-foreground">{result.confidence}%</span></p>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${result.confidence}%` }} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]">
              <Download className="h-4 w-4" /> Download
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <Link to="/library" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent">
              <BookOpen className="h-4 w-4" /> Learn more
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card title="Treatment" items={result.treatment} tone="primary" />
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
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-sm">
            <span className={`mt-2 h-2 w-2 flex-none rounded-full ${dot}`} />
            <span className="text-foreground/90">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
