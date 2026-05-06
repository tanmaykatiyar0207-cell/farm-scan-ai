import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Crown, Globe, LogOut, Sparkles, Loader2, Image as ImageIcon, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [scans, setScans] = useState<any[]>([]);
  const [signingOut, setSigningOut] = useState(false);
  const [loadingScans, setLoadingScans] = useState(true);
  
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data, error } = await supabase
          .from("user_scans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
          
        if (data) setScans(data);
      }
      setLoadingScans(false);
    };
    
    loadProfile();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const lang = i18n.language;
  const setLang = (l: string) => i18n.changeLanguage(l);
  
  // Calculate daily usage from actual database scans
  const todayScans = scans.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString());
  const used = todayScans.length;
  const total = 20;
  const pct = Math.min((used / total) * 100, 100);
  
  const fullName = user?.user_metadata?.full_name || "Farmer";
  const initial = fullName.charAt(0).toUpperCase();
  const email = user?.email || "loading...";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground font-display">{initial}</div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">{fullName}</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">Free</span>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-semibold">{t("Daily usage")}</h2>
            <p className="text-sm text-muted-foreground">{used} of {total} {t("scans used today")}</p>
          </div>
          <span className="font-display text-2xl font-bold text-primary">{used}/{total}</span>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Scan History Section */}
      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
          <ImageIcon className="h-5 w-5 text-primary" /> {t("Your Scan History")}
        </h2>
        
        {loadingScans ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="mt-2 text-sm">Loading your crops...</p>
          </div>
        ) : scans.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background p-8 text-center">
            <p className="text-sm text-muted-foreground">You haven't scanned any crops yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {scans.map((scan) => (
              <div key={scan.id} className="group relative overflow-hidden rounded-xl border border-border bg-background">
                <img 
                  src={scan.image_url} 
                  alt="Crop Scan" 
                  className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="flex items-center gap-1 text-xs font-medium text-white">
                    <MapPin className="h-3 w-3" /> {scan.location || "Unknown"}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/80">
                    <Calendar className="h-3 w-3" /> {new Date(scan.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 to-primary-soft/20 p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Crown className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">{t("Upgrade to Pro")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("Unlimited scans, history export, and priority AI analysis.")}</p>
          </div>
        </div>
        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.01]">
          <Sparkles className="h-4 w-4" /> {t("Upgrade to Pro")}
        </button>
      </div>

      <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold">
          <Globe className="h-4 w-4 text-primary" /> {t("Language")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { code: "en", label: "English" },
            { code: "hi", label: "हिन्दी" },
            { code: "kn", label: "ಕನ್ನಡ" },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={handleSignOut}
        disabled={signingOut}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-70"
      >
        {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />} 
        {signingOut ? "Signing out..." : t("Sign out")}
      </button>
    </div>
  );
}
