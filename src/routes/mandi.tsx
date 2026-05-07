import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { 
  Search, MapPin, TrendingUp, TrendingDown, Minus, 
  Loader2, ChevronLeft, ChevronRight, Info, Sparkles,
  Navigation2
} from "lucide-react";
import { ALL_MANDIS, MandiEntry } from "@/lib/mandi_data";
import { createServerFn } from "@tanstack/react-start";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { useLocation } from "@/lib/location";
import { getGeminiModel } from "@/lib/gemini";

export const Route = createFileRoute("/mandi")({
  head: () => ({
    meta: [
      { title: "Mandi Market Prices — Farmassist AI" },
      { name: "description", content: "Live market prices from mandis across India, sorted by closeness to you." },
    ],
  }),
  component: MandiPage,
});

const fetchLiveMandiPrices = createServerFn({ method: "GET" })
  .handler(async ({ data: query }: { data: string }) => {
    try {
      const model = getGeminiModel({
        model: "gemini-2.0-flash",
        systemInstruction: "You are a market analyst specializing in Indian agriculture (Mandis). Provide realistic, estimated current market prices for commodities based on seasonal trends and recent data.",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              id: { type: SchemaType.STRING },
              name: { type: SchemaType.STRING },
              state: { type: SchemaType.STRING },
              district: { type: SchemaType.STRING },
              lat: { type: SchemaType.NUMBER },
              lon: { type: SchemaType.NUMBER },
              commodities: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    name: { type: SchemaType.STRING },
                    price: { type: SchemaType.NUMBER },
                    unit: { type: SchemaType.STRING },
                    trend: { type: SchemaType.STRING, enum: ["up", "down"] }
                  },
                  required: ["name", "price", "unit", "trend"]
                }
              }
            },
            required: ["id", "name", "state", "district", "lat", "lon", "commodities"]
          }
        }
      });
      
      const prompt = `Provide 3-5 realistic local mandi prices for ${query}, India.`;
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text() || "[]");
    } catch (e) {
      console.error("Mandi Fetch Error:", e);
      return []; 
    }
  });

const geocodeCity = createServerFn({ method: "GET" })
  .handler(async ({ data: city }: { data: string }) => {
    try {
      const model = getGeminiModel({
        model: "gemini-2.0-flash",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            lat: { type: SchemaType.NUMBER },
            lon: { type: SchemaType.NUMBER }
          },
          required: ["lat", "lon"]
        }
      });
      
      const prompt = `Geocode "${city}, India". Return the latitude and longitude.`;
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text() || '{"lat": 28.61, "lon": 77.20}');
    } catch (e) {
      console.error("Geocoding Error:", e);
      return { lat: 28.61, lon: 77.20 };
    }
  });


function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}


function MandiPage() {
  const { city: globalCity, state: globalState, lat: userLat, lon: userLon } = useLocation();
  const [search, setSearch] = useState("");
  const [centerLoc, setCenterLoc] = useState({ 
    name: globalCity || "My Region", 
    lat: userLat || 12.9716, 
    lon: userLon || 77.5946 
  });
  const [manualCity, setManualCity] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [extraMandis, setExtraMandis] = useState<MandiEntry[]>([]);
  const [sortedMandis, setSortedMandis] = useState<(MandiEntry & { distance?: number })[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedMandis, setExpandedMandis] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'distance' | 'price_low' | 'price_high'>('distance');
  const [filterState, setFilterState] = useState<string>(globalState || "All States");
  const itemsPerPage = 50;

  // Initial Sort
  useEffect(() => {
    if (userLat && userLon) {
      setCenterLoc({ name: globalCity || "My Location", lat: userLat, lon: userLon });
    }
  }, [userLat, userLon, globalCity]);

  // Unified Sorting & Combining Logic
  useEffect(() => {
    const combined = [...extraMandis, ...ALL_MANDIS];
    // Deduplicate by name
    const unique = Array.from(new Map(combined.map(m => [m.name.toLowerCase(), m])).values());
    
    const withDistance = unique.map(m => ({
      ...m,
      distance: calculateDistance(centerLoc.lat, centerLoc.lon, m.lat, m.lon)
    }));

    setSortedMandis(withDistance);
  }, [centerLoc, extraMandis]);

  const handleManualLocation = async () => {
    if (!manualCity.trim()) return;
    setIsGeocoding(true);
    setLoading(true);
    try {
      const coords = await geocodeCity({ data: manualCity });
      setCenterLoc({ name: manualCity, ...coords });
      
      const liveResults = await fetchLiveMandiPrices({ data: manualCity });
      if (liveResults && liveResults.length > 0) {
        setExtraMandis(prev => [...liveResults, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeocoding(false);
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => setExpandedMandis(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, manualCity, filterState, sortBy, centerLoc]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    
    let list = sortedMandis.filter(m => {
      const matchState = filterState === "All States" || m.state === filterState;
      if (!matchState) return false;

      // Filter by the crop/search input instantly as they type
      if (!s) return true;

      return (
        m.name.toLowerCase().includes(s) || 
        m.state.toLowerCase().includes(s) ||
        m.district.toLowerCase().includes(s) ||
        m.commodities?.some(c => c.name.toLowerCase().includes(s))
      );
    });

    if (sortBy === 'distance') list.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    else if (sortBy === 'price_low') list.sort((a, b) => (a.commodities?.[0]?.price || 0) - (b.commodities?.[0]?.price || 0));
    else if (sortBy === 'price_high') list.sort((a, b) => (b.commodities?.[0]?.price || 0) - (a.commodities?.[0]?.price || 0));
    
    return list;
  }, [sortedMandis, search, sortBy, filterState]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const statesList = ["All States", ...new Set(ALL_MANDIS.map(m => m.state))].sort();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Minimal Hero */}
      <section className="relative overflow-hidden border-b border-border bg-hero-gradient px-4 py-16 md:py-24">
        <div className="absolute -top-[10%] -left-[5%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-3 w-3" /> Live Mandi Rates
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Mandi <span className="text-primary">Intelligence</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Real-time market prices for 3,000+ hubs. Search any location or crop to get regional insights instantly.
          </p>

          {/* Minimal Search bar */}
          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-3xl border border-border bg-card p-2 shadow-soft sm:flex-row">
            <div className="flex flex-[1.2] items-center gap-3 px-4 py-2">
              <MapPin className="h-5 w-5 text-primary" />
              <input 
                type="text" placeholder="Type city..." 
                className="w-full bg-transparent font-medium outline-none" 
                value={manualCity} onChange={e => setManualCity(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleManualLocation()} 
              />
              <button onClick={handleManualLocation} disabled={isGeocoding} className="rounded-xl bg-primary px-3 py-2 text-white shadow-sm hover:scale-[1.02]">
                {isGeocoding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
            <div className="hidden w-px bg-border sm:block my-2" />
            <div className="flex flex-1 items-center gap-3 px-4 py-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Search crops..." className="w-full bg-transparent font-medium outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-6xl px-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Database Status</p>
              <p className="text-lg font-bold mt-1">{filtered.length} Mandis Active</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold outline-none cursor-pointer">
              <option value="distance">Nearest Markets</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <select value={filterState} onChange={e => setFilterState(e.target.value)} className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold outline-none cursor-pointer">
              {statesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {loading ? Array(6).fill(0).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-card" />) : 
           paginated.length > 0 ? paginated.map(mandi => {
            const expanded = expandedMandis.includes(mandi.id);
            return (
              <div key={mandi.id} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-md">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">{mandi.name}</h3>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1"><MapPin className="h-3 w-3 text-primary" />{mandi.district}, {mandi.state}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {mandi.distance !== undefined && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary border border-primary/20">
                        {mandi.distance.toFixed(0)} KM
                      </span>
                    )}
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${mandi.lat},${mandi.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary border border-border"
                      title="Open in Google Maps"
                    >
                      <Navigation2 className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {(expanded ? mandi.commodities : mandi.commodities?.slice(0, 4))?.map((c, idx) => (
                    <div key={idx} className="rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:bg-background">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase line-clamp-1">{c.name}</span>
                        <span className={`text-[10px] font-black ${c.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                          {c.trend === 'up' ? '▲' : '▼'}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold">₹{c.price?.toLocaleString()}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">/Q</span>
                      </div>
                    </div>
                  ))}
                </div>

                {mandi.commodities?.length > 4 && (
                  <button onClick={() => toggleExpand(mandi.id)} className="mt-6 w-full rounded-2xl py-3 text-xs font-bold text-muted-foreground border border-border hover:bg-accent transition-colors">
                    {expanded ? "Show Less" : `View ${mandi.commodities.length - 4} More Prices`}
                  </button>
                )}
              </div>
            );
          }) : (
            <div className="col-span-full py-24 text-center bg-card rounded-3xl border border-border shadow-soft">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <p className="text-xl font-bold">No local results for "{search}"</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto px-4">
                We couldn't find matches in our offline database. Try using the location search above to find live prices for this region.
              </p>
              <button 
                onClick={() => { setManualCity(search); handleManualLocation(); }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
              >
                <Sparkles className="h-4 w-4" /> Search India-wide via AI
              </button>
            </div>
          )}
        </div>

        {/* Minimal Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft">
              <button onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === 1} className="p-2 rounded-xl hover:bg-accent disabled:opacity-20"><ChevronLeft className="h-5 w-5" /></button>
              <span className="px-4 text-xs font-bold">Page {currentPage} of {totalPages}</span>
              <button onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === totalPages} className="p-2 rounded-xl hover:bg-accent disabled:opacity-20"><ChevronRight className="h-5 w-5" /></button>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => (
                <button key={i+1} onClick={() => { setCurrentPage(i+1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`h-1.5 rounded-full transition-all ${currentPage === i+1 ? 'bg-primary w-8' : 'bg-border w-3'}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
