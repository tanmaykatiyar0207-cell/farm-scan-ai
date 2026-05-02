import { createFileRoute, Link } from "@tanstack/react-router";
import leafspot from "@/assets/disease-leafspot.jpg";
import mildew from "@/assets/disease-mildew.jpg";
import rust from "@/assets/disease-rust.jpg";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Scan History — Farmassist AI" },
      { name: "description", content: "Review your past crop scans and diagnoses." },
    ],
  }),
  component: HistoryPage,
});

const items = [
  { img: leafspot, crop: "Tomato", disease: "Early Leaf Spot", date: "May 2, 2026", sev: "Medium" },
  { img: mildew, crop: "Grape", disease: "Powdery Mildew", date: "Apr 28, 2026", sev: "High" },
  { img: rust, crop: "Wheat", disease: "Leaf Rust", date: "Apr 24, 2026", sev: "Medium" },
  { img: leafspot, crop: "Beans", disease: "Healthy", date: "Apr 20, 2026", sev: "Healthy" },
];

const sevColor: Record<string, string> = {
  Healthy: "bg-success/15 text-success",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)]",
  High: "bg-destructive/12 text-destructive",
};

function HistoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">History</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your previous crop scans</p>
        </div>
        <Link to="/analyze" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft">
          New scan
        </Link>
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((it, i) => (
          <li key={i}>
            <Link to="/results" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <img src={it.img} alt={it.disease} className="h-16 w-16 flex-none rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-base font-semibold">{it.disease}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sevColor[it.sev]}`}>{it.sev}</span>
                </div>
                <p className="text-sm text-muted-foreground">{it.crop}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {it.date}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
