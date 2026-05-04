import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Landmark, ShieldCheck, Tractor, ExternalLink, Leaf, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";

type SchemesSearch = {
  location?: string;
};

export const Route = createFileRoute("/schemes")({
  validateSearch: (search: Record<string, unknown>): SchemesSearch => ({
    location: (search.location as string) || "All India",
  }),
  loaderDeps: ({ search: { location } }) => ({ location }),
  loader: async ({ deps: { location } }) => {
    return getSchemesForLocation({ data: location });
  },
  head: () => ({
    meta: [
      { title: "Government Schemes — Farmassist AI" },
      { name: "description", content: "Explore government subsidies, financial aid, and insurance for farmers." },
    ],
  }),
  component: SchemesPage,
  pendingComponent: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium text-muted-foreground">Searching the web for latest schemes...</p>
    </div>
  ),
});

const LOCATIONS = [
  "All India",
  "Karnataka",
  "Maharashtra",
  "Punjab",
  "Uttar Pradesh",
  "Gujarat",
  "Madhya Pradesh",
  "Andhra Pradesh",
  "Tamil Nadu",
];

const CATEGORIES = [
  { id: "all", label: "All Schemes", icon: Landmark },
  { id: "financial", label: "Financial Aid", icon: Landmark },
  { id: "insurance", label: "Crop Insurance", icon: ShieldCheck },
  { id: "equipment", label: "Equipment & Irrigation", icon: Tractor },
];

const SCHEMES_DATA = [
  {
    id: "mock1",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "financial",
    description: "Financial benefit of Rs. 6000/- per year in three equal installments to all landholding farmers' families.",
    states: ["All India"],
    link: "https://pmkisan.gov.in/",
  },
  {
    id: "mock2",
    title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "insurance",
    description: "Provides insurance cover and financial support to farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
    states: ["All India"],
    link: "https://pmfby.gov.in/",
  },
  {
    id: "mock3",
    title: "Krishi Bhagya",
    category: "equipment",
    description: "Subsidy for farm ponds, polyhouses, and micro-irrigation systems to improve rainwater harvesting and crop yield.",
    states: ["Karnataka"],
    link: "#",
  }
];

const getSchemesForLocation = createServerFn({ method: "GET" })
  .handler(async ({ data: location }: { data: string }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Returning mock schemes.");
      return SCHEMES_DATA;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Search the web for the latest, real-time government agricultural schemes, subsidies, and financial aid available for farmers in ${location}. Focus on active schemes for 2024-2026.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                category: { type: Type.STRING, description: "Must be exactly one of: financial, insurance, equipment" },
                description: { type: Type.STRING },
                states: { type: Type.ARRAY, items: { type: Type.STRING } },
                link: { type: Type.STRING, description: "URL to apply or read more. Use '#' if not found." }
              },
              required: ["id", "title", "category", "description", "states", "link"]
            }
          }
        }
      });
      
      const resultText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? response.text?.() ?? "[]";
      return JSON.parse(resultText);
    } catch (error) {
      console.error("Gemini API Error:", error);
      return SCHEMES_DATA;
    }
  });

function SchemesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate({ from: "/schemes" });
  const { location } = Route.useSearch();
  const fetchedSchemes = Route.useLoaderData();
  
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(() => {
    return fetchedSchemes.filter((s: any) => {
      const matchCat = activeCat === "all" || s.category === activeCat;
      const matchSearch = s.title.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [q, activeCat, fetchedSchemes]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Leaf className="h-3.5 w-3.5" /> Government Support
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold">{t("Schemes & Subsidies")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("Discover financial aid, crop insurance, and equipment subsidies available in your region.")}</p>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search schemes...")}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Location Dropdown */}
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary">
          <MapPin className="h-4 w-4 text-primary" />
          <select
            value={location}
            onChange={(e) => navigate({ search: { location: e.target.value } })}
            className="w-full bg-transparent text-sm font-medium outline-none"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const isActive = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? "border-primary bg-primary text-primary-foreground" 
                  : "border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" /> {t(c.label)}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <article key={s.id} className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {s.category === "financial" ? "Financial Aid" : s.category === "insurance" ? "Insurance" : "Equipment"}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {s.states.includes("All India") ? "National" : "State"}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{s.description}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {s.states.slice(0, 2).map(state => (
                   <span key={state} className="rounded border border-border/50 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                     {state}
                   </span>
                ))}
                {s.states.length > 2 && <span className="text-[10px] text-muted-foreground">+{s.states.length - 2}</span>}
              </div>
              
              <a 
                href={s.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Apply <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <Landmark className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg font-semibold">{t("No schemes found")}</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
