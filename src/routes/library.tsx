import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { diseases as diseasesEn } from "@/data/diseases";
import { diseasesHi } from "@/data/diseases-hi";
import { diseasesKn } from "@/data/diseases-kn";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Crop Disease Library — Farmassist AI" },
      { name: "description", content: "Browse common crop diseases, symptoms and treatments." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { t, i18n } = useTranslation();
  const [q, setQ] = useState("");
  
  const currentLang = i18n.language;
  const activeDiseases = useMemo(() => {
    if (currentLang === "हिन्दी") return diseasesHi;
    if (currentLang === "ಕನ್ನಡ") return diseasesKn;
    return diseasesEn;
  }, [currentLang]);

  const filtered = useMemo(() => {
    return activeDiseases.filter((d, idx) => {
      const enRef = diseasesEn[idx];
      const enMatch = (enRef.name + enRef.crop + enRef.symptoms).toLowerCase().includes(q.toLowerCase());
      const localMatch = (d.name + d.crop + d.symptoms).toLowerCase().includes(q.toLowerCase());
      return enMatch || localMatch;
    });
  }, [q, activeDiseases]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold">{t("Crop Disease Library")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("Symptoms, identification and treatment for common crop diseases.")}</p>
      </div>

      <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-soft focus-within:border-primary">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search by disease, crop or symptom…")}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, idx) => (
          <article key={d.name + d.crop + idx} className="group overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{d.crop}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{d.name}</h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground"><strong className="font-semibold text-foreground">{t("Symptoms:")}</strong> {d.symptoms}</p>
                <p className="text-sm text-muted-foreground"><strong className="font-semibold text-foreground">{t("Treatment:")}</strong> {d.treatment}</p>
              </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">{t("No diseases match")} "{q}".</p>
      )}
    </div>
  );
}
