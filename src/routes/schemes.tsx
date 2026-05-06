import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Landmark, ShieldCheck, Tractor, ExternalLink, Leaf, Loader2, Sparkles } from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { INDIAN_SCHEMES } from "../data/schemes";

type SchemesSearch = {
  location?: string;
};

export const Route = createFileRoute("/schemes")({
  validateSearch: (search: Record<string, unknown>): SchemesSearch => ({
    location: (search.location as string) || "All India",
  }),
  loader: async () => {
    return INDIAN_SCHEMES;
  },
  head: () => ({
    meta: [
      { title: "Government Schemes — Farmassist AI" },
      { name: "description", content: "Explore government subsidies, financial aid, and insurance for farmers." },
    ],
  }),
  component: SchemesPage,
});

const LOCATIONS = [
  "All India", "Karnataka", "Maharashtra", "Punjab", "Uttar Pradesh",
  "Gujarat", "Madhya Pradesh", "Andhra Pradesh", "Tamil Nadu",
];

const CATEGORIES = [
  { id: "all", label: "All Schemes", icon: Landmark },
  { id: "financial", label: "Financial Aid", icon: Landmark },
  { id: "insurance", label: "Crop Insurance", icon: ShieldCheck },
  { id: "equipment", label: "Equipment & Irrigation", icon: Tractor },
];

const getAISchemes = createServerFn({ method: "POST" })
  .handler(async ({ data: location }: { data: string }) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey.includes("your-api-key")) return [];

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                id: { type: SchemaType.STRING },
                title: { type: SchemaType.STRING },
                category: { type: SchemaType.STRING },
                description: { type: SchemaType.STRING },
                states: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                link: { type: SchemaType.STRING }
              },
              required: ["id", "title", "category", "description", "states", "link"]
            }
          }
        }
      });
      
      const prompt = `Find 5-8 NEW or STATE-SPECIFIC agricultural schemes for ${location}, India (2024-2026). Return ONLY JSON array of { id, title, category, description, states: [], link }.`;
      
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text() || "[]");
    } catch (error) {
      console.error("AI Search Error:", error);
      return [];
    }
  });

function SchemesPage() {
  const navigate = useNavigate({ from: "/schemes" });
  const { location } = Route.useSearch();
  const staticSchemes = Route.useLoaderData();
  
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [extraSchemes, setExtraSchemes] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async () => {
    setIsSearching(true);
    try {
      const results = await getAISchemes({ data: location });
      setExtraSchemes(prev => {
        const combined = [...prev, ...results];
        return Array.from(new Map(combined.map(s => [s.title.toLowerCase(), s])).values());
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const filtered = useMemo(() => {
    const combined = [...staticSchemes, ...extraSchemes];
    const unique = Array.from(new Map(combined.map(s => [s.title.toLowerCase(), s])).values());

    return unique.filter((s: any) => {
      const matchCat = activeCat === "all" || s.category === activeCat;
      const matchSearch = s.title.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase());
      const isNational = s.states.includes("All India");
      const isStateMatch = s.states.includes(location);
      const matchLocation = location === "All India" || isNational || isStateMatch;
      return matchCat && matchSearch && matchLocation;
    });
  }, [q, activeCat, staticSchemes, extraSchemes, location]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Leaf className="h-3.5 w-3.5" /> Government Support
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold">Schemes & Subsidies</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover <strong>{filtered.length}</strong> financial aid, crop insurance, and equipment subsidies available in your region.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search schemes..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary">
          <MapPin className="h-4 w-4 text-primary" />
          <select
            value={location}
            onChange={(e) => {
              setExtraSchemes([]);
              navigate({ search: { location: e.target.value } });
            }}
            className="w-full bg-transparent text-sm font-medium outline-none"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6">
        <button 
          onClick={handleAISearch}
          disabled={isSearching}
          className="group relative flex items-center gap-3 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {isSearching ? "Searching web..." : `Find Latest Schemes for ${location}`}
          <div className="absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" /> {c.label}
              </button>
            );
          })}
        </div>
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
              <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Apply <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <Landmark className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-lg font-semibold">No schemes found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
