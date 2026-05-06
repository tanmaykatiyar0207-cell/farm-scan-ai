import { jsxs, jsx } from "react/jsx-runtime";
import { c as createSsrRpc } from "./createSsrRpc-l1y8KE69.js";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Leaf, Search, MapPin, Loader2, Sparkles, Landmark, ShieldCheck, Tractor, ExternalLink } from "lucide-react";
import { R as Route } from "./router-B23tt4C4.js";
import { c as createServerFn } from "../server.js";
import "react-i18next";
import "@supabase/supabase-js";
import "i18next";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const LOCATIONS = ["All India", "Karnataka", "Maharashtra", "Punjab", "Uttar Pradesh", "Gujarat", "Madhya Pradesh", "Andhra Pradesh", "Tamil Nadu"];
const CATEGORIES = [{
  id: "all",
  label: "All Schemes",
  icon: Landmark
}, {
  id: "financial",
  label: "Financial Aid",
  icon: Landmark
}, {
  id: "insurance",
  label: "Crop Insurance",
  icon: ShieldCheck
}, {
  id: "equipment",
  label: "Equipment & Irrigation",
  icon: Tractor
}];
const getAISchemes = createServerFn({
  method: "POST"
}).handler(createSsrRpc("453e3685e2009543c71d4e734c7493ef9f0bf1569e10a2615163dcd9c906a232"));
function SchemesPage() {
  const navigate = useNavigate({
    from: "/schemes"
  });
  const {
    location
  } = Route.useSearch();
  const staticSchemes = Route.useLoaderData();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [extraSchemes, setExtraSchemes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleAISearch = async () => {
    setIsSearching(true);
    try {
      const results = await getAISchemes({
        data: location
      });
      setExtraSchemes((prev) => {
        const combined = [...prev, ...results];
        return Array.from(new Map(combined.map((s) => [s.title.toLowerCase(), s])).values());
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };
  const filtered = useMemo(() => {
    const combined = [...staticSchemes, ...extraSchemes];
    const unique = Array.from(new Map(combined.map((s) => [s.title.toLowerCase(), s])).values());
    return unique.filter((s) => {
      const matchCat = activeCat === "all" || s.category === activeCat;
      const matchSearch = s.title.toLowerCase().includes(q.toLowerCase()) || s.description.toLowerCase().includes(q.toLowerCase());
      const isNational = s.states.includes("All India");
      const isStateMatch = s.states.includes(location);
      const matchLocation = location === "All India" || isNational || isStateMatch;
      return matchCat && matchSearch && matchLocation;
    });
  }, [q, activeCat, staticSchemes, extraSchemes, location]);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10 md:py-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsx(Leaf, { className: "h-3.5 w-3.5" }),
        " Government Support"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-4xl font-extrabold", children: "Schemes & Subsidies" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
        "Discover ",
        /* @__PURE__ */ jsx("strong", { children: filtered.length }),
        " financial aid, crop insurance, and equipment subsidies available in your region."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search schemes...", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-soft focus-within:border-primary", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsx("select", { value: location, onChange: (e) => {
          setExtraSchemes([]);
          navigate({
            search: {
              location: e.target.value
            }
          });
        }, className: "w-full bg-transparent text-sm font-medium outline-none", children: LOCATIONS.map((loc) => /* @__PURE__ */ jsx("option", { value: loc, children: loc }, loc)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-center gap-6", children: [
      /* @__PURE__ */ jsxs("button", { onClick: handleAISearch, disabled: isSearching, className: "group relative flex items-center gap-3 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50", children: [
        isSearching ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
        isSearching ? "Searching web..." : `Find Latest Schemes for ${location}`,
        /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: CATEGORIES.map((c) => {
        const Icon = c.icon;
        const isActive = activeCat === c.id;
        return /* @__PURE__ */ jsxs("button", { onClick: () => setActiveCat(c.id), className: `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"}`, children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          " ",
          c.label
        ] }, c.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: filtered.map((s) => /* @__PURE__ */ jsxs("article", { className: "group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary", children: s.category === "financial" ? "Financial Aid" : s.category === "insurance" ? "Insurance" : "Equipment" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground", children: s.states.includes("All India") ? "National" : "State" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-xl font-bold leading-tight", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground line-clamp-3", children: s.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
          s.states.slice(0, 2).map((state) => /* @__PURE__ */ jsx("span", { className: "rounded border border-border/50 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground", children: state }, state)),
          s.states.length > 2 && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "+",
            s.states.length - 2
          ] })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: s.link, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline", children: [
          "Apply ",
          /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
        ] })
      ] })
    ] }, s.id)) }),
    filtered.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
      /* @__PURE__ */ jsx(Landmark, { className: "mx-auto h-12 w-12 text-muted-foreground/30" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg font-semibold", children: "No schemes found" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting your filters or search term." })
    ] })
  ] });
}
export {
  SchemesPage as component
};
