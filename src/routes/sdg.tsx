import { createFileRoute } from "@tanstack/react-router";
import { Wheat, TrendingUp, HeartHandshake, Sprout } from "lucide-react";

export const Route = createFileRoute("/sdg")({
  head: () => ({
    meta: [
      { title: "SDG Alignment — Farmassist AI" },
      { name: "description", content: "How Farmassist AI supports UN Sustainable Development Goals." },
    ],
  }),
  component: SDGPage,
});

function SDGPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sprout className="h-3.5 w-3.5" /> Sustainable Impact
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">SDG Alignment</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Farmassist AI is built to advance the United Nations Sustainable Development Goals through accessible technology.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <SDGCard
          n="02"
          color="bg-[oklch(0.7_0.18_85)]"
          title="Zero Hunger"
          Icon={Wheat}
          desc="By detecting crop diseases early, we help reduce food loss and improve yields for smallholder farmers worldwide."
        />
        <SDGCard
          n="08"
          color="bg-[oklch(0.55_0.2_25)]"
          title="Decent Work & Economic Growth"
          Icon={TrendingUp}
          desc="Healthier harvests mean better incomes — supporting resilient rural economies and farming livelihoods."
        />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: "30%", v: "potential reduction in crop loss" },
          { k: "5s", v: "to diagnose any photo" },
          { k: "3", v: "languages for inclusivity" },
        ].map((s) => (
          <div key={s.k} className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
            <p className="font-display text-4xl font-extrabold text-primary">{s.k}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-4 rounded-3xl border border-primary/20 bg-primary/8 p-6">
        <HeartHandshake className="mt-1 h-6 w-6 flex-none text-primary" />
        <p className="text-sm text-foreground/90">
          We're committed to keeping a free tier so that the farmers who need this technology most never get priced out of it.
        </p>
      </div>
    </div>
  );
}

function SDGCard({ n, color, title, Icon, desc }: { n: string; color: string; title: string; Icon: any; desc: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-card ${color}`}>
      <div className="flex items-start justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-display text-5xl font-extrabold opacity-30">{n}</span>
      </div>
      <h3 className="mt-4 font-display text-xl font-bold">SDG {n} · {title}</h3>
      <p className="mt-2 text-sm text-white/90">{desc}</p>
    </div>
  );
}
