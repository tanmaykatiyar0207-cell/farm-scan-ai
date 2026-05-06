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

const CATEGORIES = ["All", "Rice", "Wheat", "Tomato", "Potato", "Corn", "Citrus", "Fruit", "Vegetable"];

function getSeverity(treatment: string, symptoms: string): "High" | "Medium" | "Low" {
  const highRisk = ["destroy", "immediate", "death", "quarantine", "collapse", "ruin"];
  const text = (treatment + symptoms).toLowerCase();
  if (highRisk.some(word => text.includes(word))) return "High";
  if (text.includes("fungicide") || text.includes("prune")) return "Medium";
  return "Low";
}

function LibraryPage() {
  const { t, i18n } = useTranslation();
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(20);
  
  const currentLang = i18n.language;
  const activeDiseases = useMemo(() => {
    if (currentLang === "hi") return diseasesHi;
    if (currentLang === "kn") return diseasesKn;
    return diseasesEn;
  }, [currentLang]);

  const filtered = useMemo(() => {
    return activeDiseases.filter((d, idx) => {
      const enRef = diseasesEn[idx];
      const searchStr = (enRef.name + enRef.crop + enRef.symptoms).toLowerCase();
      const matchesSearch = searchStr.includes(q.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || 
                             enRef.crop.toLowerCase().includes(activeCategory.toLowerCase()) ||
                             (activeCategory === "Fruit" && ["Apple", "Mango", "Grapes", "Banana", "Citrus", "Orange"].some(f => enRef.crop.includes(f))) ||
                             (activeCategory === "Vegetable" && ["Tomato", "Potato", "Onion", "Cabbage", "Cucumber", "Pepper"].some(v => enRef.crop.includes(v)));
      
      return matchesSearch && matchesCategory;
    });
  }, [q, activeDiseases, activeCategory]);

  const visibleDiseases = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-emerald-50/30 font-sans">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl font-display">
            {t("Disease Library")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("A curated database of common crop diseases with symptoms and treatment plans.")}
          </p>
        </div>

        <div className="relative z-40 mb-12 space-y-6">
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setVisibleCount(20); }}
              placeholder={t("Search diseases, crops or symptoms…")}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-white shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base font-medium transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(20); }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-white shadow-md"
                    : "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDiseases.map((d, idx) => {
            const enRef = diseasesEn[activeDiseases.indexOf(d)];
            const severity = getSeverity(enRef.treatment, enRef.symptoms);
            
            return (
              <article 
                key={d.name + d.crop + idx} 
                className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                    {d.crop}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${severity === 'High' ? 'bg-red-500' : severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {severity}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4">
                  {d.name}
                </h3>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t("Symptoms")}</h4>
                    <p className="text-sm text-gray-600 line-clamp-3 italic">"{d.symptoms}"</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t("Treatment")}</h4>
                    <p className="text-sm text-gray-700 font-medium line-clamp-4">{d.treatment}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <button 
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(enRef.name + " " + enRef.crop + " disease treatment")}`, "_blank")}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <Search className="h-3 w-3" /> {t("Search Online")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 21)}
              className="px-8 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-lg"
            >
              {t("Load More")}
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-20 text-center py-12">
            <Search className="h-10 w-10 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">{t("No results found")}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
