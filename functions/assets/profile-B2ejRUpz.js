import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { Image, Loader2, MapPin, Calendar, Crown, Sparkles, Globe, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-B23tt4C4.js";
import "@supabase/supabase-js";
import "i18next";
function ProfilePage() {
  const {
    t,
    i18n
  } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [signingOut, setSigningOut] = useState(false);
  const [loadingScans, setLoadingScans] = useState(true);
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: {
          user: user2
        }
      } = await supabase.auth.getUser();
      setUser(user2);
      if (user2) {
        const {
          data,
          error
        } = await supabase.from("user_scans").select("*").eq("user_id", user2.id).order("created_at", {
          ascending: false
        });
        if (data) setScans(data);
      }
      setLoadingScans(false);
    };
    loadProfile();
  }, []);
  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate({
      to: "/"
    });
  };
  const lang = i18n.language;
  const setLang = (l) => i18n.changeLanguage(l);
  const todayScans = scans.filter((s) => new Date(s.created_at).toDateString() === (/* @__PURE__ */ new Date()).toDateString());
  const used = todayScans.length;
  const total = 20;
  const pct = Math.min(used / total * 100, 100);
  const fullName = user?.user_metadata?.full_name || "Farmer";
  const initial = fullName.charAt(0).toUpperCase();
  const email = user?.email || "loading...";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-10 md:py-14", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground font-display", children: initial }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-xl font-bold", children: fullName }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: email })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary", children: "Free" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-base font-semibold", children: t("Daily usage") }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            used,
            " of ",
            total,
            " ",
            t("scans used today")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-display text-2xl font-bold text-primary", children: [
          used,
          "/",
          total
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary transition-all duration-1000", style: {
        width: `${pct}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-4 flex items-center gap-2 font-display text-lg font-bold", children: [
        /* @__PURE__ */ jsx(Image, { className: "h-5 w-5 text-primary" }),
        " ",
        t("Your Scan History")
      ] }),
      loadingScans ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm", children: "Loading your crops..." })
      ] }) : scans.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed border-border bg-background p-8 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "You haven't scanned any crops yet." }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: scans.map((scan) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-xl border border-border bg-background", children: [
        /* @__PURE__ */ jsx("img", { src: scan.image_url, alt: "Crop Scan", className: "aspect-square w-full object-cover transition-transform group-hover:scale-105" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs font-medium text-white", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            scan.location || "Unknown"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-[10px] text-white/80", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
            " ",
            new Date(scan.created_at).toLocaleDateString()
          ] })
        ] })
      ] }, scan.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/8 to-primary-soft/20 p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Crown, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold", children: t("Upgrade to Pro") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("Unlimited scans, history export, and priority AI analysis.") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.01]", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
        " ",
        t("Upgrade to Pro")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-display text-base font-semibold", children: [
        /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-primary" }),
        " ",
        t("Language")
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: [{
        code: "en",
        label: "English"
      }, {
        code: "hi",
        label: "हिन्दी"
      }, {
        code: "kn",
        label: "ಕನ್ನಡ"
      }].map((l) => /* @__PURE__ */ jsx("button", { onClick: () => setLang(l.code), className: `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${lang === l.code ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`, children: l.label }, l.code)) })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: handleSignOut, disabled: signingOut, className: "mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-70", children: [
      signingOut ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
      signingOut ? "Signing out..." : t("Sign out")
    ] })
  ] });
}
export {
  ProfilePage as component
};
