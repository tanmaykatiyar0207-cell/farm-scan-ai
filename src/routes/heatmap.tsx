import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Map as MapIcon, 
  Filter, 
  ChevronRight, 
  Clock, 
  MapPin, 
  AlertCircle,
  Database,
  Search
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/heatmap")({
  component: HeatmapPage,
});

interface Analysis {
  id: string;
  disease: string;
  crop: string;
  severity: "High" | "Medium" | "Low";
  lat: number;
  lon: number;
  city: string;
  state: string;
  created_at: string;
}

import { MOCK_DATA } from "@/data/mock_heatmap";

const CROPS = ["All", "Rice", "Wheat", "Tomato", "Potato", "Corn", "Citrus", "Fruit", "Vegetable"];
const TIME_RANGES = ["All Time", "Last 7 Days", "Last 30 Days"];

function HeatmapPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>(() => {
    const localData = JSON.parse(localStorage.getItem("communityAnalyses") || "[]");
    return [...localData, ...MOCK_DATA];
  });
  const [filteredCrop, setFilteredCrop] = useState("All");
  const [timeRange, setTimeRange] = useState("All Time");
  const [loading, setLoading] = useState(false); // Set to false to allow instant map init with mock data
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchFilter, setActiveSearchFilter] = useState<string | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const heatLayerRef = useRef<any>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      // SILENT FETCH: We don't set loading to true here because we have mock data.
      // This makes the map appear instantly.
      const { data, error: supabaseError } = await supabase
        .from("analyses")
        .select("id, disease, crop, severity, lat, lon, city, state, created_at")
        .order("created_at", { ascending: false })
        .limit(200); // Limit background fetch for speed

      if (data && data.length > 0) {
        setAnalyses(prev => {
          const combined = [...prev, ...data];
          // Filter unique by ID to prevent duplicates from background sync
          return Array.from(new Map(combined.map(a => [a.id, a])).values());
        });
      }
    } catch (err) {
      console.warn("Background fetch failed, using local/mock data.");
    }
    // No finally { setLoading(false) } needed anymore as we start at false
  };

  const filteredAnalyses = useMemo(() => {
    // Explicitly filter out any non-Indian cities for a clean demo
    const forbidden = ["Islamabad", "Lahore", "Karachi", "Dhaka", "Colombo", "Kathmandu"];
    
    return analyses.filter((a) => {
      if (forbidden.includes(a.city)) return false;
      
      let cropMatch = filteredCrop === "All" || a.crop === filteredCrop;
      
      // Handle special categories
      if (filteredCrop === "Fruit") {
        cropMatch = ["Apple", "Mango", "Grapes", "Banana", "Citrus", "Orange"].includes(a.crop);
      } else if (filteredCrop === "Vegetable") {
        cropMatch = ["Tomato", "Potato", "Onion", "Cabbage", "Cucumber", "Pepper"].includes(a.crop);
      }
      
      let timeMatch = true;
      const date = new Date(a.created_at).getTime();
      const now = Date.now();
      if (timeRange === "Last 7 Days") {
        timeMatch = date > (now - 7 * 24 * 60 * 60 * 1000);
      } else if (timeRange === "Last 30 Days") {
        timeMatch = date > (now - 30 * 24 * 60 * 60 * 1000);
      }
      
      let searchMatch = true;
      if (activeSearchFilter) {
        searchMatch = a.city.toLowerCase().includes(activeSearchFilter.toLowerCase()) || 
                      a.state.toLowerCase().includes(activeSearchFilter.toLowerCase());
      }
      
      return cropMatch && timeMatch && searchMatch;
    });
  }, [analyses, filteredCrop, timeRange, activeSearchFilter]);

  const stats = useMemo(() => {
    const high = filteredAnalyses.filter(a => a.severity === "High").length;
    const medium = filteredAnalyses.filter(a => a.severity === "Medium").length;
    const low = filteredAnalyses.filter(a => a.severity === "Low").length;
    const total = filteredAnalyses.length || 1;
    return { 
      high, medium, low, 
      highPct: (high / total) * 100,
      mediumPct: (medium / total) * 100,
      lowPct: (low / total) * 100
    };
  }, [filteredAnalyses]);

  const markersRef = useRef<any>(null);

  useEffect(() => {
    if (loading || !mapContainerRef.current) return;

    let resizeObserver: ResizeObserver | null = null;

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !L.heatLayer || !L.markerClusterGroup) {
        console.log("LEAFLET_RETRY: Scripts not ready yet...");
        const timer = setTimeout(initMap, 300);
        return () => clearTimeout(timer);
      }

      // Cleanup existing map if it exists (safety for React 18 Strict Mode)
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (e) {
          console.warn("LEAFLET_CLEANUP_WARN:", e);
        }
      }

      try {
        const sw = L.latLng(6.0, 68.0);
        const ne = L.latLng(38.0, 98.0);
        const bounds = L.latLngBounds(sw, ne);

        const m = L.map(mapContainerRef.current, {
          center: [22.5, 82.9],
          zoom: 5,
          minZoom: 5,
          maxZoom: 10,
          zoomControl: false,
          maxBounds: bounds,
          maxBoundsViscosity: 1.0,
          preferCanvas: true,
          updateWhenIdle: true, // Performance boost
          updateWhenZooming: false // Smoother zoom
        });

        mapRef.current = m;

        // 1. Base Layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
          attribution: '© CARTO',
        }).addTo(m);

        // 2. India Mask
        const worldCoords = [[-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180]];
        const indiaHole = [[37.5, 68], [37.5, 97], [8, 97], [8, 68], [37.5, 68]];
        L.polygon([worldCoords, indiaHole], {
          color: '#000', weight: 0, fillColor: '#000', fillOpacity: 0.25, interactive: false
        }).addTo(m);

        // 3. Labels
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png", {
          opacity: 0.8
        }).addTo(m);

        L.control.zoom({ position: 'bottomright' }).addTo(m);
        
        markersRef.current = L.markerClusterGroup({
          showCoverageOnHover: false,
          spiderfyOnMaxZoom: true,
          maxClusterRadius: 40,
          iconCreateFunction: (cluster: any) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 text-white font-black text-xs shadow-lg border-2 border-white backdrop-blur-sm">${count}</div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(40, 40)
            });
          }
        }).addTo(m);

        // Automatic Resize Handling
        resizeObserver = new ResizeObserver(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);

        // Initial Size Check
        setTimeout(() => {
          m.invalidateSize();
        }, 100);

        updateHeatmap();
      } catch (err) {
        console.error("LEAFLET_INIT_ERROR:", err);
      }
    };

    const cleanup = initMap();

    return () => {
      if (typeof cleanup === 'function') cleanup();
      if (resizeObserver) resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [loading]);

  const updateHeatmap = () => {
    const L = (window as any).L;
    if (!L || !mapRef.current || !markersRef.current) return;

    if (heatLayerRef.current) {
      mapRef.current.removeLayer(heatLayerRef.current);
    }

    const heatPoints = filteredAnalyses
      .filter(a => a.lat && a.lon)
      .map(a => [a.lat, a.lon, a.severity === "High" ? 1.0 : a.severity === "Medium" ? 0.7 : 0.4]);

    if (L.heatLayer) {
      heatLayerRef.current = L.heatLayer(heatPoints, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: { 0.2: '#10b981', 0.6: '#f59e0b', 1.0: '#ef4444' }
      }).addTo(mapRef.current);
    }

    markersRef.current.clearLayers();
    
    const newMarkers = filteredAnalyses.map(a => {
      const isReal = (a as any).isRealtime;
      const color = a.severity === "High" ? "#ef4444" : a.severity === "Medium" ? "#f59e0b" : "#10b981";

      if (isReal) {
        return L.marker([a.lat, a.lon], {
          icon: L.divIcon({
            html: `
              <div class="relative">
                <div class="absolute -inset-2 rounded-full bg-primary/40 animate-ping"></div>
                <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-md bg-primary"></div>
              </div>
            `,
            className: 'realtime-pulse-icon',
            iconSize: [16, 16]
          })
        }).bindPopup(`<strong>Live Detection: ${a.disease}</strong><br/>Detected just now in ${a.city}`);
      }

      const marker = L.circleMarker([a.lat, a.lon], {
        radius: 7,
        fillColor: color,
        color: "#fff",
        weight: 1.5,
        fillOpacity: 0.9
      });

      marker.bindPopup(`
        <div class="p-4 min-w-[220px] font-sans">
          <div class="flex items-center gap-3 mb-3">
            <div class="h-2.5 w-2.5 rounded-full ${a.severity === 'High' ? 'bg-red-500 shadow-red-200' : a.severity === 'Medium' ? 'bg-amber-500 shadow-amber-200' : 'bg-emerald-500 shadow-emerald-200'} shadow-lg animate-pulse"></div>
            <h3 class="font-black text-gray-900 leading-tight">${a.disease}</h3>
          </div>
          <div class="grid grid-cols-2 gap-y-2 border-t border-gray-100 pt-3 text-[11px]">
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Crop</span>
            <span class="font-black text-right text-primary">${a.crop}</span>
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Location</span>
            <span class="font-black text-right truncate pl-2">${a.city}</span>
            <span class="text-gray-400 font-bold uppercase tracking-tighter">Reported</span>
            <span class="font-black text-right text-gray-400 italic">${formatDistanceToNow(new Date(a.created_at))} ago</span>
          </div>
          <button class="w-full mt-4 py-2 bg-primary text-white text-[10px] font-black rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">Full Diagnosis</button>
        </div>
      `, { closeButton: false, className: 'custom-popup' });
      
      return marker;
    });

    // Use a small timeout to let the UI thread breathe before adding markers
    setTimeout(() => {
      if (markersRef.current) {
        markersRef.current.addLayers(newMarkers);
      }
    }, 0);
  };

  useEffect(() => {
    updateHeatmap();
  }, [filteredAnalyses]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setActiveSearchFilter(null);
      if (mapRef.current) {
        mapRef.current.flyTo([22.5, 82.9], 5);
      }
      return;
    }

    const match = analyses.find(a => 
      a.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setActiveSearchFilter(searchQuery);

    if (match && mapRef.current) {
      mapRef.current.flyTo([match.lat, match.lon], 10);
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (mapRef.current) {
          mapRef.current.flyTo([pos.coords.latitude, pos.coords.longitude], 8);
        }
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-[#fefae0]/10 overflow-hidden font-sans">
      <div className="z-20 bg-white border-b border-border/50 px-6 py-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary shadow-lg shadow-primary/20 p-2.5 rounded-2xl text-white">
            <MapIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight font-display text-gray-900 leading-tight">CropWatch</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">India Live Data Feed</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search city or state..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all w-64 font-medium"
            />
          </form>
          <button 
            onClick={handleLocateMe}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 relative bg-gray-100">
          <div className="absolute top-4 left-4 z-[400] space-y-4 w-full max-w-[calc(100%-32px)]">
            <div className="flex flex-wrap gap-2">
              <div className="bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-white flex gap-1">
                {CROPS.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setFilteredCrop(crop)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      filteredCrop === crop
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>

              <div className="bg-white/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-white flex gap-1">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      timeRange === range
                        ? "bg-gray-800 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={mapContainerRef} className="h-full w-full z-0" />

          <div className="absolute bottom-6 left-6 z-[400] bg-white/90 backdrop-blur-md border border-white/50 p-4 rounded-3xl shadow-2xl min-w-[160px]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Intensity Scale</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-200" />
                  <span className="text-xs font-bold text-gray-700">High Risk</span>
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{stats.high}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-amber-500 shadow-lg shadow-amber-200" />
                  <span className="text-xs font-bold text-gray-700">Medium</span>
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{stats.medium}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" />
                  <span className="text-xs font-bold text-gray-700">Low Risk</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{stats.low}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div style={{ width: `${stats.highPct}%` }} className="bg-red-500 h-full" />
                <div style={{ width: `${stats.mediumPct}%` }} className="bg-amber-500 h-full" />
                <div style={{ width: `${stats.lowPct}%` }} className="bg-emerald-500 h-full" />
              </div>
              <p className="text-[9px] text-gray-400 mt-2 font-bold text-center uppercase tracking-tight">Community Severity Mix</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex w-[380px] flex-col bg-white border-l border-border/50">
          <div className="p-6 border-b border-border/50 bg-gray-50/30">
            <h2 className="font-black text-lg flex items-center gap-2.5 text-gray-900">
              <div className="p-1.5 bg-primary/10 rounded-lg"><Clock className="h-4 w-4 text-primary" /></div>
              {activeSearchFilter ? `Outbreaks in ${activeSearchFilter}` : "Latest Outbreaks"}
            </h2>
            {activeSearchFilter && (
              <button 
                onClick={() => { 
                  setActiveSearchFilter(null); 
                  setSearchQuery(""); 
                  if (mapRef.current) mapRef.current.flyTo([22.5, 82.9], 5);
                }}
                className="mt-2 text-[10px] font-bold text-primary hover:underline uppercase tracking-tight"
              >
                ✕ Clear regional filter
              </button>
            )}
            {error && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2 text-amber-800 text-[11px] font-bold">
                <AlertCircle className="h-4 w-4 flex-none" />
                {error}
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {filteredAnalyses.length > 0 ? (
              filteredAnalyses.map((a) => (
                <div 
                  key={a.id} 
                  className="group relative p-5 rounded-[2rem] border border-gray-100 bg-white hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (mapRef.current && a.lat && a.lon) {
                      mapRef.current.flyTo([a.lat, a.lon], 12);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col">
                      <span className={`text-[9px] w-fit uppercase tracking-widest font-black px-2.5 py-1 rounded-full mb-2 ${
                        a.severity === 'High' ? 'bg-red-100 text-red-600' : a.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {a.severity} Severity
                      </span>
                      <h3 className="font-black text-gray-900 group-hover:text-primary transition-colors text-base">{a.disease}</h3>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-2xl text-[10px] font-black text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {a.crop}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
                      <MapPin className="h-3.5 w-3.5 text-gray-300" />
                      <span className="truncate">{a.city}, {a.state}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-[11px] font-bold text-gray-400">
                      <Clock className="h-3.5 w-3.5 text-gray-300" />
                      {formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-50 rounded-[3rem] h-20 w-20 flex items-center justify-center mx-auto mb-6 text-gray-200">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="font-black text-gray-900">No outbreaks found</h3>
                <p className="text-sm text-gray-400 mt-2 font-medium px-10 leading-relaxed">Try adjusting your filters or time range to see community reports.</p>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t border-border/50">
            <div className="p-5 rounded-[2rem] bg-primary/5 border border-primary/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Community Activity</p>
              <p className="text-xl font-black text-gray-900">{analyses.length} Active Reports</p>
              <p className="text-[11px] text-gray-500 mt-1 font-bold italic">Helping farmers across India stay informed.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .leaflet-container { background: #f8fafc !important; }
        .custom-popup .leaflet-popup-content-wrapper { 
          border-radius: 1.5rem; 
          padding: 0; 
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-content { margin: 0; }
        .custom-popup .leaflet-popup-tip { display: none; }
      `}</style>
    </div>
  );
}
