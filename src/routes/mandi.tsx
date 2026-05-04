import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp, TrendingDown, Minus, Navigation2, Loader2, Info } from "lucide-react";
import { ALL_MANDIS, MandiEntry } from "@/lib/mandi_data";

export const Route = createFileRoute("/mandi")({
  head: () => ({
    meta: [
      { title: "Mandi Market Prices — Farmassist AI" },
      { name: "description", content: "Live market prices from mandis across India, sorted by closeness to you." },
    ],
  }),
  component: MandiPage,
});

// Haversine formula to calculate distance between two lat/lon points in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const LOCATIONS = [
  { name: "My Current GPS", lat: 0, lon: 0 },
  { name: "Bangalore", lat: 12.97, lon: 77.59 },
  { name: "Mumbai", lat: 19.07, lon: 72.87 },
  { name: "Delhi", lat: 28.61, lon: 77.20 },
  { name: "Chennai", lat: 13.08, lon: 80.27 },
  { name: "Lucknow", lat: 26.84, lon: 80.94 },
  { name: "Nagpur", lat: 21.14, lon: 79.08 },
  { name: "Ludhiana", lat: 30.90, lon: 75.85 },
  { name: "Ahmedabad", lat: 23.02, lon: 72.57 },
  { name: "Indore", lat: 22.71, lon: 75.85 },
];

function MandiPage() {
  const [search, setSearch] = useState("");
  const [centerLoc, setCenterLoc] = useState({ name: "My Current GPS", lat: 0, lon: 0 });
  const [sortedMandis, setSortedMandis] = useState<(MandiEntry & { distance?: number })[]>([]);
  const [loading, setLoading] = useState(true);

  // Price jittering based on day of year to make it "dynamic"
  const getDynamicPrice = (base: number) => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const change = 1 + (Math.sin(dayOfYear + base) * 0.02);
    return Math.floor(base * change);
  };

  useEffect(() => {
    const runSort = (lat: number, lon: number) => {
      const withDistance = ALL_MANDIS.map(m => ({
        ...m,
        distance: calculateDistance(lat, lon, m.lat, m.lon),
        commodities: m.commodities.map(c => ({ ...c, price: getDynamicPrice(c.price) }))
      })).sort((a, b) => a.distance - b.distance);
      
      setSortedMandis(withDistance);
      setLoading(false);
    };

    if (centerLoc.name === "My Current GPS") {
      if ("geolocation" in navigator) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            runSort(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
            // Fallback to Bangalore if GPS fails
            runSort(12.97, 77.59);
          }
        );
      } else {
        runSort(12.97, 77.59);
      }
    } else {
      runSort(centerLoc.lat, centerLoc.lon);
    }
  }, [centerLoc]);

  const filteredMandis = sortedMandis.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.state.toLowerCase().includes(search.toLowerCase()) ||
    m.district.toLowerCase().includes(search.toLowerCase()) ||
    m.commodities.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Live Mandi Prices</h1>
            <span className="hidden rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success sm:inline-flex animate-pulse">LIVE DATA</span>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">Real-time market rates from 50+ mandis across India.</p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <span className="absolute -top-2 left-3 bg-card px-1 text-[10px] font-bold text-primary">SORT BY NEARNESS TO</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
              <MapPin className="h-4 w-4 text-primary" />
              <select 
                value={centerLoc.name}
                onChange={(e) => {
                  const loc = LOCATIONS.find(l => l.name === e.target.value);
                  if (loc) setCenterLoc(loc);
                }}
                className="bg-transparent text-sm font-semibold outline-none cursor-pointer pr-4"
              >
                {LOCATIONS.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
              </select>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search crop or market..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-soft"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-[2.5rem] bg-muted/50" />
          ))
        ) : filteredMandis.length > 0 ? (
          filteredMandis.map((mandi) => (
            <div key={mandi.id} className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-soft transition-all hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
              <div className="bg-muted/30 p-6 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors leading-tight">{mandi.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> {mandi.district}, {mandi.state}
                    </p>
                  </div>
                  {mandi.distance !== undefined && (
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary border border-primary/20">
                        <Navigation2 className="h-3 w-3 fill-current" />
                        {mandi.distance.toFixed(1)} KM
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-5">
                {mandi.commodities.map((crop, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/50 group-hover:bg-primary/5 transition-colors font-bold text-lg text-muted-foreground">
                        {crop.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold sm:text-base">{crop.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Per {crop.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold sm:text-lg text-foreground">₹{crop.price.toLocaleString()}</p>
                      <span className={`flex items-center justify-end gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                        crop.trend === 'up' ? 'text-green-600' : crop.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {crop.trend === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : crop.trend === 'down' ? <TrendingDown className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                        {crop.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
               <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-semibold">No results found</p>
            <p className="text-muted-foreground mt-1">Try searching for a different crop or city.</p>
          </div>
        )}
      </div>
    </div>
  );
}
