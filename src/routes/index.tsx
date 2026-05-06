import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-crop.jpg";
import { 
  Camera, Sparkles, Leaf, ArrowRight, ShieldCheck, Zap, 
  ChevronDown, Droplets, Wind, Sun, AlertTriangle, CheckCircle2, 
  Users, MapPin, Navigation 
} from "lucide-react";
import { useState, useEffect } from "react";
import { MarketDashboard } from "@/components/MarketDashboard";
import { useLocation } from "@/lib/location";
import { STATE_DISTRICTS } from "@/lib/mandi_data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmassist AI — Check crop health in seconds" },
      { name: "description", content: "Upload a photo of your crop and let AI diagnose disease in seconds." },
      { property: "og:title", content: "Farmassist AI — Check crop health in seconds" },
      { property: "og:description", content: "Upload a photo and get instant AI-powered diagnosis." },
    ],
  }),
  component: HomePage,
});

const weatherRecommendations: Record<string, {
  temp: number; humidity: number; condition: string; icon: "sun" | "rain" | "alert";
  tips: { crop: string; advice: string; risk: "low" | "medium" | "high" }[];
}> = {
  Karnataka: { temp: 32, humidity: 68, condition: "Partly Cloudy", icon: "sun", tips: [{ crop: "Ragi", advice: "Humidity at 68% — ideal time to apply fungicide spray.", risk: "medium" }, { crop: "Tomato", advice: "High moisture risk. Watch for Early Blight.", risk: "high" }] },
  Maharashtra: { temp: 34, humidity: 45, condition: "Sunny", icon: "sun", tips: [{ crop: "Cotton", advice: "Low humidity. Soil is drying fast, schedule evening irrigation.", risk: "low" }, { crop: "Onion", advice: "Monitor for Thrips activity due to dry heat.", risk: "medium" }] },
  Punjab: { temp: 28, humidity: 55, condition: "Overcast", icon: "rain", tips: [{ crop: "Wheat", advice: "Rain expected. Postpone harvesting to avoid spoilage.", risk: "high" }, { crop: "Mustard", advice: "Check for aphid infestation after rain.", risk: "medium" }] },
  "Uttar Pradesh": { temp: 30, humidity: 60, condition: "Humid", icon: "sun", tips: [{ crop: "Sugarcane", advice: "Ideal for growth. Add urea top dressing before next rain.", risk: "low" }, { crop: "Potato", advice: "Mist alert — high risk of Late Blight.", risk: "high" }] },
  "Tamil Nadu": { temp: 31, humidity: 75, condition: "Coastal Rain", icon: "rain", tips: [{ crop: "Paddy", advice: "Drain excess water from nurseries to prevent root rot.", risk: "high" }, { crop: "Coconut", advice: "Apply organic mulch to retain moisture.", risk: "low" }] },
  "West Bengal": { temp: 29, humidity: 82, condition: "Stormy", icon: "rain", tips: [{ crop: "Jute", advice: "Strong winds. Check for stem breakage.", risk: "medium" }, { crop: "Rice", advice: "High humidity — risk of Blast disease.", risk: "high" }] },
  "Rajasthan": { temp: 42, humidity: 15, condition: "Heatwave", icon: "alert", tips: [{ crop: "Bajra", advice: "Extreme heat. Provide light irrigation.", risk: "high" }, { crop: "Guar", advice: "Drought tolerant, but watch for leaf scorching.", risk: "low" }] },
  "Kerala": { temp: 28, humidity: 90, condition: "Monsoon", icon: "rain", tips: [{ crop: "Rubber", advice: "Heavy rain. Ensure rain guards are intact.", risk: "high" }, { crop: "Black Pepper", advice: "Risk of Quick Wilt.", risk: "medium" }] },
  "Assam": { temp: 27, humidity: 85, condition: "Heavy Rain", icon: "rain", tips: [{ crop: "Tea", advice: "Rain stimulates flush. Watch for Red Spider Mites.", risk: "low" }, { crop: "Pineapple", advice: "Ensure pits are well-drained.", risk: "medium" }] },
};

const DEFAULT_RECOMMENDATION = {
  temp: 28, humidity: 50, condition: "Stable", icon: "sun" as const,
  tips: [
    { crop: "Regional Crops", advice: "Maintain soil health and monitor for local pests.", risk: "low" as const },
    { crop: "Universal Advisory", advice: "Ensure proper drainage and morning irrigation.", risk: "low" as const }
  ]
};

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", 
  "Ladakh", "Puducherry", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
].sort();

const faqs = [
  { q: "How do I scan my crop for diseases?", a: "Simply navigate to the 'Analyze' tab and upload a clear photo of the infected plant leaf. Our AI will analyze and provide a diagnosis, severity report, and treatment plan in seconds." },
  { q: "What are your pricing plans?", a: "We offer a Daily Pass for ₹99 and a Monthly Pro subscription for ₹999 for ongoing seasonal monitoring with priority AI processing." },
  { q: "How many crop diseases can the AI detect?", a: "Our AI is trained to identify 150+ major crop diseases. Browse the full list in our Disease Library." },
  { q: "Are my crop photos stored securely?", a: "Yes. Images are processed securely and are never shared or sold to third parties." },
  { q: "How accurate is the disease detection?", a: "Our models are trained on hundreds of thousands of crop images. For widespread infections, we recommend verifying with a local agronomist." },
  { q: "Can I view my past crop scans?", a: "Yes! All previous scans and diagnoses are saved in your History tab for seasonal tracking." },
  { q: "What if the AI can't identify the disease?", a: "Ensure your photo is well-lit and in focus. The specific disease may not yet be in our database — we update it constantly." },
];

const TIP_POOL: Record<string, { crop: string; advice: string; risk: "low" | "medium" | "high"; cat: "SOIL" | "PEST" | "WATER" | "MARKET" }[]> = {
  "South": [
    { crop: "Paddy", advice: "BPH (Brown Planthopper) alert in early-sown crops. Use neem-based sprays.", risk: "high", cat: "PEST" },
    { crop: "Coconut", advice: "Ideal time for root feeding with micronutrients for better nut size.", risk: "low", cat: "SOIL" },
    { crop: "Ragi", advice: "Expected afternoon drizzle. Delay pesticide spray by 24 hours.", risk: "medium", cat: "WATER" },
    { crop: "Turmeric", advice: "Market prices for dried rhizomes trending up in Erode. Hold harvest.", risk: "low", cat: "MARKET" }
  ],
  "North": [
    { crop: "Wheat", advice: "Stem rust alert due to rising morning mist. Inspect lower leaves.", risk: "high", cat: "PEST" },
    { crop: "Mustard", advice: "Aphid population threshold reached. Apply recommended bio-insecticide.", risk: "medium", cat: "PEST" },
    { crop: "Potato", advice: "Late blight risk 90%. Preventive copper spray is mandatory today.", risk: "high", cat: "PEST" },
    { crop: "Sugarcane", advice: "Top-dress with Nitrogen before the predicted light showers.", risk: "low", cat: "SOIL" }
  ],
  "West": [
    { crop: "Cotton", advice: "Pink bollworm warning in rain-fed areas. Set up pheromone traps.", risk: "high", cat: "PEST" },
    { crop: "Onion", advice: "Prices expected to peak in 15 days. Ensure proper curing for storage.", risk: "low", cat: "MARKET" },
    { crop: "Grapes", advice: "High UV index today. Ensure canopy management to avoid berry scorch.", risk: "medium", cat: "WATER" },
    { crop: "Groundnut", advice: "Calcium deficiency spotted in regional soil tests. Apply gypsum.", risk: "medium", cat: "SOIL" }
  ],
  "East": [
    { crop: "Jute", advice: "Ideal water level for retting. Start harvest for optimal fiber quality.", risk: "low", cat: "WATER" },
    { crop: "Maize", advice: "Fall Armyworm alert. Check central whorls of 30-45 day old plants.", risk: "high", cat: "PEST" },
    { crop: "Tea", advice: "Blister blight risk high due to heavy overcast. Improve drainage.", risk: "medium", cat: "PEST" },
    { crop: "Pineapple", advice: "Prices stable. Good window for local bulk supply contracts.", risk: "low", cat: "MARKET" }
  ]
};

const STATE_HUB_COORDS: Record<string, { lat: number; lon: number }> = {
  "Andhra Pradesh": { lat: 16.5062, lon: 80.6480 },
  "Arunachal Pradesh": { lat: 27.0844, lon: 93.6053 },
  "Assam": { lat: 26.1445, lon: 91.7362 },
  "Bihar": { lat: 25.5941, lon: 85.1376 },
  "Chhattisgarh": { lat: 21.2514, lon: 81.6296 },
  "Goa": { lat: 15.4909, lon: 73.8278 },
  "Gujarat": { lat: 23.2156, lon: 72.6369 },
  "Haryana": { lat: 30.7333, lon: 76.7794 },
  "Himachal Pradesh": { lat: 31.1048, lon: 77.1734 },
  "Jharkhand": { lat: 23.3441, lon: 85.3096 },
  "Karnataka": { lat: 12.9716, lon: 77.5946 },
  "Kerala": { lat: 8.5241, lon: 76.9366 },
  "Madhya Pradesh": { lat: 23.2599, lon: 77.4126 },
  "Maharashtra": { lat: 18.5204, lon: 73.8567 },
  "Manipur": { lat: 24.8170, lon: 93.9368 },
  "Meghalaya": { lat: 25.5788, lon: 91.8933 },
  "Mizoram": { lat: 23.7271, lon: 92.7176 },
  "Nagaland": { lat: 25.6751, lon: 94.1086 },
  "Odisha": { lat: 20.2961, lon: 85.8245 },
  "Punjab": { lat: 30.7333, lon: 76.7794 },
  "Rajasthan": { lat: 26.9124, lon: 75.7873 },
  "Sikkim": { lat: 27.3314, lon: 88.6138 },
  "Tamil Nadu": { lat: 13.0827, lon: 80.2707 },
  "Telangana": { lat: 17.3850, lon: 78.4867 },
  "Tripura": { lat: 23.8315, lon: 91.2868 },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462 },
  "Uttarakhand": { lat: 30.3165, lon: 78.0322 },
  "West Bengal": { lat: 22.5726, lon: 88.3639 },
  "Delhi": { lat: 28.6139, lon: 77.2090 },
  "Jammu and Kashmir": { lat: 34.0837, lon: 74.7973 },
  "Ladakh": { lat: 34.1526, lon: 77.5771 },
  "Puducherry": { lat: 11.9416, lon: 79.8083 },
  "Andaman and Nicobar Islands": { lat: 11.6234, lon: 92.7265 },
  "Chandigarh": { lat: 30.7333, lon: 76.7794 },
  "Dadra and Nagar Haveli and Daman and Diu": { lat: 20.4283, lon: 72.8397 },
  "Lakshadweep": { lat: 10.5667, lon: 72.6417 }
};

const getRegion = (state: string) => {
  const south = ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana", "Puducherry", "Lakshadweep"];
  const north = ["Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh", "Jammu and Kashmir", "Ladakh", "Delhi", "Uttarakhand", "Chandigarh"];
  const west = ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "Dadra and Nagar Haveli and Daman and Diu"];
  if (south.includes(state)) return "South";
  if (north.includes(state)) return "North";
  if (west.includes(state)) return "West";
  return "East";
};

function WeatherReco({ state }: { state: string }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString());
  }, []);

  const data = weatherRecommendations[state] || DEFAULT_RECOMMENDATION;
  const region = getRegion(state);
  const dynamicTips = TIP_POOL[region] || TIP_POOL["South"];
  
  const riskColors = { low: "text-success bg-success/10", medium: "text-warning bg-warning/10", high: "text-destructive bg-destructive/10" };
  const catColors = { SOIL: "bg-amber-100 text-amber-700", PEST: "bg-rose-100 text-rose-700", WATER: "bg-blue-100 text-blue-700", MARKET: "bg-emerald-100 text-emerald-700" };

  return (
    <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
            <Sparkles className="h-3 w-3" /> AI Dynamic Advisor
          </span>
          <h3 className="mt-2 font-display text-xl font-bold">Live Intelligence for <span className="text-primary">{state}</span></h3>
          <p className="text-xs text-muted-foreground mt-0.5">Rotational insights updated for {formattedDate || "..."}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1.5 font-semibold"><Sun className="h-4 w-4 text-warning" />{data.temp}°C</span>
          <span className="flex items-center gap-1.5 font-semibold"><Droplets className="h-4 w-4 text-blue-500" />{data.humidity}%</span>
          <span className="flex items-center gap-1.5 text-muted-foreground font-medium"><Wind className="h-4 w-4" />{data.condition}</span>
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dynamicTips.map((tip, idx) => (
          <div key={idx} className="group flex flex-col rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-card hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className={`rounded-md px-2 py-0.5 text-[9px] font-black tracking-wider ${catColors[tip.cat]}`}>
                {tip.cat}
              </span>
              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${riskColors[tip.risk]}`}>
                {tip.risk} risk
              </span>
            </div>
            <h4 className="font-display font-bold text-base group-hover:text-primary transition-colors">{tip.crop}</h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{tip.advice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">Quick answers about how Farmassist AI works.</p>
      </div>
      <ul className="mt-10 space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="font-display text-sm font-semibold sm:text-base">{item.q}</span>
                <ChevronDown className={`h-5 w-5 flex-none text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 border-b border-border">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Leaf className="h-3.5 w-3.5" /> Our Mission
          </span>
          <h2 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl leading-tight">
            Empowering farmers with <br/>
            <span className="text-primary">AI-Powered Intelligence</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
            Every year, billions of dollars in crops are lost to diseases caught too late. Farmassist AI puts a plant pathologist in every farmer's pocket, reducing crop loss and increasing global food security.
          </p>
          <div className="mt-10 p-6 rounded-3xl bg-muted/30 border border-border">
             <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-lg">Our Story</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
              Born from a vision to make smart agriculture accessible — not just for big farms, but for every farmer with a phone.
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="p-8 rounded-3xl border border-border bg-card shadow-soft hover:shadow-xl transition-all duration-300">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-6">
              <AlertTriangle className="h-6 w-6" />
            </span>
            <h3 className="font-display text-xl font-bold">The Problem</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Smallholder farmers lack timely access to agronomy experts. By the time a disease is identified, half the harvest may already be lost.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-border bg-card shadow-soft hover:shadow-xl transition-all duration-300">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <Zap className="h-6 w-6" />
            </span>
            <h3 className="font-display text-xl font-bold">Our Solution</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A computer vision model trained on thousands of crop images detects disease, severity and recommends treatment instantly from a photo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function LocationControl() {
  const { city, state, setLocation } = useLocation();
  const [isLocating, setIsLocating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const baseDistricts = STATE_DISTRICTS[state] || [];
  const districts = (city && !baseDistricts.includes(city)) 
    ? [city, ...baseDistricts] 
    : baseDistricts;

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }
    
    setIsLocating(true);
    setStatus("Detecting...");

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
          headers: { "User-Agent": "FarmScanAI/1.0" }
        });
        const data = await res.json();
        const addr = data.address || {};
        
        const stateField = addr.state || addr.state_district || addr.region || "";
        const matchedState = STATES.find(s => 
          stateField.toLowerCase().includes(s.toLowerCase()) || 
          s.toLowerCase().includes(stateField.toLowerCase())
        ) || state;

        let rawCity = addr.state_district || addr.city_district || addr.town || addr.city || addr.village || addr.suburb || "";
        
        const cleanCity = rawCity
          .replace(/\sDistrict$/i, "")
          .replace(/\sTehsil$/i, "")
          .replace(/\sTaluk$/i, "")
          .replace(/\sMandal$/i, "")
          .trim();

        const hubMatch = baseDistricts.find(d => 
          cleanCity.toLowerCase().includes(d.toLowerCase()) || 
          d.toLowerCase().includes(cleanCity.toLowerCase())
        );

        const finalCity = hubMatch || cleanCity;
        
        setLocation(finalCity, matchedState, lat, lon);
        setStatus(finalCity ? `Found: ${finalCity}` : `Found: ${matchedState}`);
        setTimeout(() => setStatus(null), 3000);
      } catch (e) {
        setStatus("Detection error");
      } finally {
        setIsLocating(false);
      }
    }, (err) => {
      setStatus(err.code === 1 ? "Permission Denied" : "GPS Error");
      setIsLocating(false);
    }, { timeout: 8000, enableHighAccuracy: true });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 -mt-12 relative z-20">
      <div className="rounded-[32px] border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Current Region</h3>
              <p className="text-sm text-muted-foreground">
                {city ? `${city}, ${state}` : `Whole State of ${state}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-all hover:border-primary/30">
                <span className="text-muted-foreground font-medium">State:</span>
                <select
                  value={state}
                  onChange={(e) => {
                    const hub = STATE_HUB_COORDS[e.target.value] || { lat: 12.97, lon: 77.59 };
                    setLocation("", e.target.value, hub.lat, hub.lon);
                  }}
                  className="bg-transparent outline-none font-bold cursor-pointer"
                >
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-all hover:border-primary/30">
                <span className="text-muted-foreground font-medium">City:</span>
                <select
                  value={city}
                  onChange={(e) => {
                    const hub = STATE_HUB_COORDS[state] || { lat: 12.97, lon: 77.59 };
                    setLocation(e.target.value, state, hub.lat, hub.lon);
                  }}
                  className="bg-transparent outline-none font-bold cursor-pointer"
                >
                  <option value="">Whole State (All Cities)</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={handleAutoDetect}
                disabled={isLocating}
                className="flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                <Navigation className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? "Locating..." : "Auto-Detect"}
              </button>
              {status && (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-primary animate-pulse">{status}</span>
                  {status.includes("Denied") && (
                    <span className="text-[9px] text-muted-foreground mt-1 text-center max-w-[120px]">
                      Click the lock icon in your browser bar to reset location permissions.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { city, state, lat, lon, setLocation } = useLocation();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient border-b border-border">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-primary-soft/20 blur-[100px]" style={{ animationDelay: "2s" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Next-Gen AI Vision Enabled
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-tight text-foreground sm:text-6xl md:text-7xl">
              Check Crop <br />
              <span className="bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent">Health Instantly.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-xl leading-relaxed">
              The world's most accessible plant pathologist. Diagnosis, severity, and treatment in under 5 seconds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/analyze" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-card transition-all hover:scale-[1.05] hover:shadow-xl">
                <Camera className="h-6 w-6" /> Analyze Your Crop
              </Link>
              <Link to="/library" className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-accent transition-all">
                Disease Library <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure</span>
              <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Real-time</span>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
            <div className="absolute -inset-4 rounded-[40px] bg-primary/20 blur-3xl transition-all duration-500 hover:bg-primary/30" />
            <img
              src={heroImg}
              alt="Healthy crop field"
              width={1536}
              height={1024}
              className="relative aspect-[4/3] w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-8 left-8 right-8 rounded-3xl border border-border/50 bg-card/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 sm:left-auto sm:right-8 sm:w-72">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Leaf className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Diagnosis Status</p>
                  <p className="font-display text-lg font-bold">Healthy Field · 98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LocationControl />
      <section className="mx-auto max-w-6xl px-4 py-20 border-b border-border">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Regional Crop Advisory</h2>
          <p className="text-base text-muted-foreground mt-2">AI-powered weather insights and field tips for your area</p>
        </div>
        <WeatherReco state={state} />
      </section>
      <AboutSection />
      <section className="mx-auto max-w-6xl px-4 py-20 border-b border-border">
        <div className="text-center">
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Three simple steps to secure your harvest. No jargon. No waiting.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { n: "01", tText: "Upload Image", d: "Snap or upload a clear photo of the affected leaf or crop.", Icon: Camera },
            { n: "02", tText: "AI Analysis", d: "Our model inspects the image and identifies the issue.", Icon: Sparkles },
            { n: "03", tText: "Get Treatment", d: "Receive severity, prevention and treatment guidance instantly.", Icon: Leaf },
          ].map(({ n, tText, d, Icon }) => (
            <div key={n} className="group relative rounded-[32px] border border-border bg-card p-10 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-display text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">{n}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold">{tText}</h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-[40px] bg-primary p-10 md:p-20 text-center text-primary-foreground shadow-2xl">
          <div className="absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-display text-4xl font-black sm:text-5xl">Ready to secure your harvest?</h3>
            <p className="mt-6 text-lg text-primary-foreground/80 font-medium">Join thousands of farmers using AI to protect their crops. Your first 20 scans every day are on us.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/analyze" className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-primary shadow-xl hover:scale-[1.05] transition-all">
                Analyze Crop Now <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-muted/30 border-t border-border">
        <FAQSection />
      </div>
    </div>
  );
}

export default HomePage;
