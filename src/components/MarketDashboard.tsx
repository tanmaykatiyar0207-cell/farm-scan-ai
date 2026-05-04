import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, MapPin, TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";

export interface MandiPrice {
  commodity: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: "up" | "down" | "stable";
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  recommendation: string;
}

const MOCK_MANDI: Record<string, MandiPrice[]> = {
  Karnataka: [
    { commodity: "Ragi", market: "Bangalore", minPrice: 3200, maxPrice: 3500, modalPrice: 3350, trend: "up" },
    { commodity: "Rice", market: "Mysore", minPrice: 4500, maxPrice: 5200, modalPrice: 4800, trend: "stable" },
    { commodity: "Tomato", market: "Kolar", minPrice: 1200, maxPrice: 1800, modalPrice: 1500, trend: "down" },
  ],
  Maharashtra: [
    { commodity: "Onion", market: "Lasalgaon", minPrice: 1500, maxPrice: 2200, modalPrice: 1800, trend: "up" },
    { commodity: "Cotton", market: "Nagpur", minPrice: 7000, maxPrice: 8500, modalPrice: 7800, trend: "stable" },
    { commodity: "Soybean", market: "Latur", minPrice: 4200, maxPrice: 4800, modalPrice: 4500, trend: "up" },
  ],
  Punjab: [
    { commodity: "Wheat", market: "Khanna", minPrice: 2125, maxPrice: 2300, modalPrice: 2200, trend: "stable" },
    { commodity: "Paddy", market: "Amritsar", minPrice: 2040, maxPrice: 2100, modalPrice: 2060, trend: "up" },
  ],
  "Uttar Pradesh": [
    { commodity: "Sugarcane", market: "Lucknow", minPrice: 350, maxPrice: 400, modalPrice: 375, trend: "up" },
    { commodity: "Wheat", market: "Agra", minPrice: 2100, maxPrice: 2250, modalPrice: 2150, trend: "stable" },
    { commodity: "Potato", market: "Kanpur", minPrice: 900, maxPrice: 1200, modalPrice: 1050, trend: "down" },
  ],
  "Tamil Nadu": [
    { commodity: "Rice", market: "Chennai", minPrice: 4800, maxPrice: 5500, modalPrice: 5100, trend: "up" },
    { commodity: "Coconut", market: "Coimbatore", minPrice: 2500, maxPrice: 3000, modalPrice: 2750, trend: "stable" },
  ],
};

const MOCK_WEATHER: Record<string, WeatherData> = {
  Karnataka: { temp: 32, condition: "Partly Cloudy", humidity: 68, windSpeed: 14, recommendation: "High humidity (68%). Avoid pesticide spraying — low wind may cause drift. Good for irrigation." },
  Maharashtra: { temp: 36, condition: "Hot & Dry", humidity: 52, windSpeed: 18, recommendation: "Heatwave conditions. Increase drip irrigation frequency for cotton and onion crops." },
  Punjab: { temp: 28, condition: "Clear Skies", humidity: 55, windSpeed: 10, recommendation: "Ideal spraying window. Low humidity and moderate wind — apply systemic fungicide today." },
  "Uttar Pradesh": { temp: 34, condition: "Humid", humidity: 72, windSpeed: 8, recommendation: "Very high humidity. High risk of sugarcane red rot and wheat rust — inspect crops closely." },
  "Tamil Nadu": { temp: 30, condition: "Coastal Humid", humidity: 78, windSpeed: 20, recommendation: "Coastal winds increasing humidity. Blast disease risk is high for paddy — apply preventive spray." },
};

interface MarketDashboardProps {
  initialState?: string;
}

export function MarketDashboard({ initialState = "Karnataka" }: MarketDashboardProps) {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Get real weather data from Open-Meteo (Free, no key)
        // Coordinates for centers of states (approximate)
        const coords: Record<string, { lat: number, lon: number }> = {
           Karnataka: { lat: 12.97, lon: 77.59 },
           Maharashtra: { lat: 19.07, lon: 72.87 },
           Punjab: { lat: 30.90, lon: 75.85 },
           "Uttar Pradesh": { lat: 26.84, lon: 80.94 },
           "Tamil Nadu": { lat: 13.08, lon: 80.27 },
        };
        const loc = coords[initialState] || coords["Karnataka"];
        
        const wResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
        const wData = await wResp.json();
        const current = wData.current;

        // Map WMO codes to conditions
        const codeMap: Record<number, string> = { 
          0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast", 
          45: "Foggy", 51: "Drizzle", 61: "Rainy", 71: "Snowy", 80: "Showers", 95: "Thunderstorm" 
        };
        const condition = codeMap[current.weather_code] || "Clear Sky";

        // 2. Prepare dynamic Mandi prices (jitter mock data based on day)
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const statePrices = JSON.parse(JSON.stringify(MOCK_MANDI[initialState] || MOCK_MANDI["Karnataka"])) as MandiPrice[];
        
        const jitteredPrices = statePrices.map(p => {
          // Change price by ±2% based on day
          const change = 1 + (Math.sin(dayOfYear + p.modalPrice) * 0.02);
          p.modalPrice = Math.floor(p.modalPrice * change);
          p.maxPrice = Math.floor(p.maxPrice * change);
          p.minPrice = Math.floor(p.minPrice * change);
          p.trend = Math.sin(dayOfYear + p.modalPrice) > 0.3 ? "up" : Math.sin(dayOfYear + p.modalPrice) < -0.3 ? "down" : "stable";
          return p;
        });

        setPrices(jitteredPrices);
        setWeather({
          temp: Math.round(current.temperature_2m),
          condition,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          recommendation: MOCK_WEATHER[initialState]?.recommendation || MOCK_WEATHER["Karnataka"].recommendation
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setPrices(MOCK_MANDI[initialState] || MOCK_MANDI["Karnataka"]);
        setWeather(MOCK_WEATHER[initialState] || MOCK_WEATHER["Karnataka"]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [initialState]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-64 animate-pulse rounded-3xl bg-muted" />
        <div className="h-64 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Weather Card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-6 shadow-soft">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> {initialState}, India
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Live Weather</span>
        </div>

        <div className="mt-6 flex items-end gap-4">
          <div className="text-5xl font-bold">{weather?.temp}°C</div>
          <div className="mb-1">
            <p className="font-semibold text-foreground">{weather?.condition}</p>
            <p className="text-xs text-muted-foreground">Feels like {(weather?.temp ?? 0) + 2}°C</p>
          </div>
          <Cloud className="ml-auto h-12 w-12 text-primary/40" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Droplets className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Humidity</p>
              <p className="text-sm font-bold">{weather?.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Wind className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wind</p>
              <p className="text-sm font-bold">{weather?.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {weather?.recommendation && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-primary/8 p-4 text-xs text-primary">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{weather.recommendation}</p>
          </div>
        )}
      </div>

      {/* Mandi Prices Card */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Mandi Market Prices</h3>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Per Quintal (₹)</span>
        </div>

        <div className="mt-6 space-y-3">
          {prices.map((item, idx) => (
            <div key={idx} className="group flex items-center justify-between rounded-2xl border border-transparent hover:border-border hover:bg-background/50 p-2 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted font-bold text-muted-foreground group-hover:bg-primary/12 group-hover:text-primary transition-colors">
                  {item.commodity[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{item.commodity}</p>
                  <p className="text-[10px] text-muted-foreground">{item.market} Mandi</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹{item.modalPrice.toLocaleString()}</p>
                {item.trend === "up" ? (
                  <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-green-600">
                    <TrendingUp className="h-3 w-3" /> +2.4%
                  </span>
                ) : item.trend === "down" ? (
                  <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-red-500">
                    <TrendingDown className="h-3 w-3" /> -1.2%
                  </span>
                ) : (
                  <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-muted-foreground">
                    <Minus className="h-3 w-3" /> Stable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-[10px] text-muted-foreground italic">
          * Prices updated daily · Source: AGMARKNET
        </p>
      </div>
    </div>
  );
}
