import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-crop.jpg";
import { Camera, Sparkles, Leaf, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

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

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Powered by AI vision
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">
              Check Crop Health <br/>
              <span className="text-primary">in Seconds.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Upload a photo and get instant AI-powered diagnosis, severity and treatment for your crops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.02]">
                <Camera className="h-5 w-5" /> Analyze a crop
              </Link>
              <Link to="/library" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground hover:bg-accent">
                Browse library <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Private & secure</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Results in 5s</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> 3 languages</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-2xl" />
            <img
              src={heroImg}
              alt="Healthy crop field"
              width={1536}
              height={1024}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
            />
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-border bg-card/95 p-4 shadow-card backdrop-blur sm:left-auto sm:right-5 sm:w-64">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Leaf className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Diagnosis</p>
                  <p className="font-display text-sm font-semibold">Healthy · 98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three simple steps. No jargon. No waiting.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", t: "Upload Image", d: "Snap or upload a clear photo of the affected leaf or crop.", Icon: Camera },
            { n: "02", t: "AI Analysis", d: "Our model inspects the image and identifies the issue.", Icon: Sparkles },
            { n: "03", t: "Get Treatment", d: "Receive severity, prevention and treatment guidance instantly.", Icon: Leaf },
          ].map(({ n, t, d, Icon }) => (
            <div key={n} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-bold text-primary-soft">{n}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary/20 bg-primary/8 p-8 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold">Ready to check your crop?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Free for the first 20 scans every day.</p>
          </div>
          <Link to="/analyze" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]">
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
