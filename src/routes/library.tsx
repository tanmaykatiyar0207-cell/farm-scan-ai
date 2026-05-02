import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import leafspot from "@/assets/disease-leafspot.jpg";
import mildew from "@/assets/disease-mildew.jpg";
import rust from "@/assets/disease-rust.jpg";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Crop Disease Library — Farmassist AI" },
      { name: "description", content: "Browse common crop diseases, symptoms and treatments." },
    ],
  }),
  component: LibraryPage,
});

const diseases = [
  { img: leafspot, name: "Leaf Spot", crop: "Tomato, Beans", symptoms: "Brown circular spots with yellow halo on leaves.", treatment: "Copper fungicide and remove infected leaves." },
  { img: mildew, name: "Powdery Mildew", crop: "Grape, Cucumber", symptoms: "White powdery patches on leaf surfaces.", treatment: "Sulfur spray and improved airflow between plants." },
  { img: rust, name: "Leaf Rust", crop: "Wheat, Coffee", symptoms: "Orange-brown pustules on the underside of leaves.", treatment: "Apply triazole fungicide; use resistant varieties." },
  { img: leafspot, name: "Blight", crop: "Potato, Tomato", symptoms: "Dark water-soaked lesions; rapid leaf collapse.", treatment: "Mancozeb spray; rotate crops every season." },
  { img: mildew, name: "Downy Mildew", crop: "Grape, Spinach", symptoms: "Yellow patches with greyish growth underneath.", treatment: "Apply protectant fungicide; avoid wet foliage." },
  { img: rust, name: "Anthracnose", crop: "Mango, Beans", symptoms: "Sunken dark lesions on fruits and leaves.", treatment: "Prune infected parts; copper-based sprays." },
];

function LibraryPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => diseases.filter((d) => (d.name + d.crop + d.symptoms).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold">Crop Disease Library</h1>
        <p className="mt-2 text-sm text-muted-foreground">Symptoms, identification and treatment for common crop diseases.</p>
      </div>

      <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-soft focus-within:border-primary">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by disease, crop or symptom…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <article key={d.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
            <img src={d.img} alt={d.name} className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.03]" loading="lazy" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{d.crop}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{d.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Symptoms:</span> {d.symptoms}</p>
              <p className="mt-1.5 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Treatment:</span> {d.treatment}</p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">No diseases match "{q}".</p>
      )}
    </div>
  );
}
