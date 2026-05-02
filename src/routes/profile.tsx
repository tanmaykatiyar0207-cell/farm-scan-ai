import { createFileRoute } from "@tanstack/react-router";
import { Crown, Globe, LogOut, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Farmassist AI" },
      { name: "description", content: "Your account, plan and language settings." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [lang, setLang] = useState("English");
  const used = 12, total = 20;
  const pct = (used / total) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground font-display">A</div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">Aarav Sharma</h1>
            <p className="text-sm text-muted-foreground">aarav@farmer.in</p>
          </div>
          <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">Free</span>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-semibold">Daily usage</h2>
            <p className="text-sm text-muted-foreground">{used} of {total} scans used today</p>
          </div>
          <span className="font-display text-2xl font-bold text-primary">{used}/{total}</span>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 to-primary-soft/20 p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Crown className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">Upgrade to Pro</h3>
            <p className="mt-1 text-sm text-muted-foreground">Unlimited scans, history export, and priority AI analysis.</p>
          </div>
        </div>
        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.01]">
          <Sparkles className="h-4 w-4" /> Upgrade to Pro
        </button>
      </div>

      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <Globe className="h-4 w-4 text-primary" /> Language
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {["English", "हिन्दी", "ಕನ್ನಡ"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                lang === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold text-muted-foreground hover:text-destructive">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}
