import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-crop.jpg";
import { Camera, Sparkles, Leaf, ArrowRight, ShieldCheck, Zap, Globe, ChevronDown, Droplets, Wind, Sun, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { MarketDashboard } from "@/components/MarketDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmassist AI — Check crop health in seconds" },
      { name: "description", content: "Upload a photo of your crop and get instant AI-powered disease diagnosis, severity and treatment." },
      { property: "og:title", content: "Farmassist AI — Check crop health in seconds" },
      { property: "og:description", content: "Upload a photo and get instant AI-powered diagnosis." },
    ],
  }),
  component: HomePage,
});

// --- Weather-based recommendations per state ---
const weatherRecommendations: Record<string, {
  temp: number; humidity: number; condition: string; icon: "sun" | "rain" | "alert";
  tips: { crop: string; advice: string; risk: "low" | "medium" | "high" }[];
}> = {
  Karnataka: {
    temp: 32, humidity: 68, condition: "Partly Cloudy",
    icon: "sun",
    tips: [
      { crop: "Ragi", advice: "Humidity at 68% — ideal time to apply fungicide spray. Avoid irrigation today.", risk: "medium" },
      { crop: "Tomato", advice: "High moisture risk. Watch for Early Blight and apply copper-based spray.", risk: "high" },
      { crop: "Sugarcane", advice: "Conditions are favorable. Ensure adequate drainage to prevent root rot.", risk: "low" },
    ],
  },
  Maharashtra: {
    temp: 36, humidity: 52, condition: "Hot & Dry",
    icon: "alert",
    tips: [
      { crop: "Cotton", advice: "Heatwave risk. Increase irrigation frequency. Check for pink bollworm in buds.", risk: "high" },
      { crop: "Onion", advice: "Dry conditions slow fungal spread. Good window to apply systemic fungicide.", risk: "low" },
      { crop: "Soybean", advice: "Moderate heat stress. Foliar spray of potassium can improve resilience.", risk: "medium" },
    ],
  },
  Punjab: {
    temp: 28, humidity: 55, condition: "Clear Skies",
    icon: "sun",
    tips: [
      { crop: "Wheat", advice: "Ideal spraying conditions. Low humidity reduces pesticide drift losses.", risk: "low" },
      { crop: "Paddy", advice: "Warm days ahead. Monitor for stem borers and keep fields flooded.", risk: "medium" },
    ],
  },
  "Uttar Pradesh": {
    temp: 34, humidity: 72, condition: "Humid",
    icon: "rain",
    tips: [
      { crop: "Sugarcane", advice: "Very high humidity. Red rot disease is a real risk — inspect stalks weekly.", risk: "high" },
      { crop: "Wheat", advice: "Post-harvest drying needed. High moisture affects grain storage quality.", risk: "medium" },
    ],
  },
  "Tamil Nadu": {
    temp: 30, humidity: 78, condition: "Coastal Humid",
    icon: "rain",
    tips: [
      { crop: "Rice", advice: "Blast disease risk is elevated. Use blast-resistant varieties and drain fields periodically.", risk: "high" },
      { crop: "Coconut", advice: "High humidity — good monsoon conditions. Watch for bud rot in younger palms.", risk: "medium" },
    ],
  },
};

const STATES = ["Karnataka", "Maharashtra", "Punjab", "Uttar Pradesh", "Tamil Nadu"];

// --- FAQ Data ---
const faqs = [
  { q: "How do I scan my crop for diseases?", a: "Simply navigate to the 'Analyze' tab and upload a clear photo of the infected plant leaf. Our AI will analyze and provide a diagnosis, severity report, and treatment plan in seconds." },
  { q: "What are your pricing plans?", a: "We offer a Daily Pass for ₹99 and a Monthly Pro subscription for ₹999 for ongoing seasonal monitoring with priority AI processing." },
  { q: "Which languages are supported?", a: "Farmassist AI is fully localized in English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ). Switch using the language toggle in the navbar." },
  { q: "How many crop diseases can the AI detect?", a: "Our AI is trained to identify 150+ major crop diseases. Browse the full list in our Disease Library." },
  { q: "Are my crop photos stored securely?", a: "Yes. Images are processed securely and are never shared or sold to third parties." },
  { q: "How accurate is the disease detection?", a: "Our models are trained on hundreds of thousands of crop images. For widespread infections, we recommend verifying with a local agronomist." },
  { q: "Can I view my past crop scans?", a: "Yes! All previous scans and diagnoses are saved in your History tab for seasonal tracking." },
  { q: "What if the AI can't identify the disease?", a: "Ensure your photo is well-lit and in focus. The specific disease may not yet be in our database — we update it constantly." },
];

function WeatherReco({ state }: { state: string }) {
  const data = weatherRecommendations[state] || weatherRecommendations["Karnataka"];
  const riskColors = { low: "text-success bg-success/10", medium: "text-warning bg-warning/10", high: "text-destructive bg-destructive/10" };
  const riskIcons = { low: CheckCircle2, medium: AlertTriangle, high: AlertTriangle };

  return (
    <div className="rounded-3xl border border-primary/10 bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
            <Sparkles className="h-3 w-3" /> AI Crop Advisory
          </span>
          <h3 className="mt-2 font-display text-xl font-bold">Today's Recommendations for <span className="text-primary">{state}</span></h3>
          <p className="text-xs text-muted-foreground mt-0.5">Based on live weather conditions</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1.5 font-semibold"><Sun className="h-4 w-4 text-warning" />{data.temp}°C</span>
          <span className="flex items-center gap-1.5 font-semibold"><Droplets className="h-4 w-4 text-blue-500" />{data.humidity}%</span>
          <span className="flex items-center gap-1.5 text-muted-foreground"><Wind className="h-4 w-4" />{data.condition}</span>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.tips.map((tip, i) => {
          const Icon = riskIcons[tip.risk];
          return (
            <div key={i} className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold">{tip.crop}</span>
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${riskColors[tip.risk]}`}>
                  <Icon className="h-2.5 w-2.5" /> {tip.risk} risk
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{tip.advice}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FAQSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("Frequently Asked Questions")}</h2>
        <p className="mt-3 text-muted-foreground">{t("Quick answers about how Farmassist AI works.")}</p>
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
                <span className="font-display text-sm font-semibold sm:text-base">{t(item.q)}</span>
                <ChevronDown className={`h-5 w-5 flex-none text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{t(item.a)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function HomePage() {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState("Karnataka");

  // Auto-detect location on mount for a personalized experience
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`, {
            headers: { "User-Agent": "FarmScanAI/1.0" }
          });
          const data = await res.json();
          const state = data.address?.state || data.address?.region || "";
          const matched = STATES.find(s => state.toLowerCase().includes(s.toLowerCase()));
          if (matched) setSelectedState(matched);
        } catch (e) {
          console.log("Landing page geocode failed", e);
        }
      }, null, { timeout: 5000 });
    }
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-primary-soft/20 blur-[100px]" style={{ animationDelay: "2s" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t("Powered by AI vision")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">
              {t("Check Crop Health")} <br />
              <span className="bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent">{t("in Seconds.")}</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              {t("Upload a photo and get instant AI-powered diagnosis, severity and treatment for your crops.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.02]">
                <Camera className="h-5 w-5" /> {t("Analyze a crop")}
              </Link>
              <Link to="/library" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground hover:bg-accent">
                {t("Browse library")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> {t("Private & secure")}</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> {t("Results in 5s")}</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> {t("3 languages")}</span>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-700">
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl transition-all duration-500 hover:bg-primary/30 hover:blur-3xl" />
            <img
              src={heroImg}
              alt="Healthy crop field"
              width={1536}
              height={1024}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-card transition-transform duration-500 hover:scale-[1.02]"
            />
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-xl backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 sm:left-auto sm:right-5 sm:w-64">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Leaf className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{t("Diagnosis")}</p>
                  <p className="font-display text-sm font-semibold">{t("Healthy · 98%")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market & Weather Dashboard */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">{t("Market & Weather Dashboard")}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t("Live Mandi prices and field weather for your region")}</p>
          </div>
          {/* State selector shared between Market and Recommendations */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm">
            <Globe className="h-4 w-4 text-primary" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent outline-none font-medium cursor-pointer"
            >
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <MarketDashboard initialState={selectedState} />
      </section>

      {/* Personalized Weather-Based Recommendations */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <WeatherReco state={selectedState} />
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("How it works")}</h2>
          <p className="mt-3 text-muted-foreground">{t("Three simple steps. No jargon. No waiting.")}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", tText: "Upload Image", d: "Snap or upload a clear photo of the affected leaf or crop.", Icon: Camera },
            { n: "02", tText: "AI Analysis", d: "Our model inspects the image and identifies the issue.", Icon: Sparkles },
            { n: "03", tText: "Get Treatment", d: "Receive severity, prevention and treatment guidance instantly.", Icon: Leaf },
          ].map(({ n, tText, d, Icon }) => (
            <div key={n} className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-bold text-primary-soft">{n}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t(tText)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(d)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary/20 bg-primary/8 p-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold">{t("Ready to check your crop?")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("Free for the first 20 scans every day.")}</p>
          </div>
          <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]">
            {t("Start now")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* FAQ — inline at the bottom */}
      <div className="border-t border-border bg-muted/30">
        <FAQSection />
      </div>
    </div>
  );
}
