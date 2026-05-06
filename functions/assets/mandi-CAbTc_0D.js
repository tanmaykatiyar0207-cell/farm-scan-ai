import { jsxs, jsx } from "react/jsx-runtime";
import { c as createSsrRpc } from "./createSsrRpc-l1y8KE69.js";
import { useState, useEffect, useMemo } from "react";
import { Sparkles, MapPin, Loader2, ChevronRight, Search, Info, Navigation2, ChevronLeft } from "lucide-react";
import { u as useLocation, A as ALL_MANDIS } from "./router-B23tt4C4.js";
import { c as createServerFn } from "../server.js";
import "@tanstack/react-router";
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
const fetchLiveMandiPrices = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8b2b791de38b4fe7d6e5f76e53cfc6462e79404e5a58490d3e58ad62448559b9"));
const geocodeCity = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7a0930bf3d609a5d36ab753fbcb89eeebfafb274e3db2ff09735671fe829aa28"));
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function MandiPage() {
  const {
    city: globalCity,
    state: globalState,
    lat: userLat,
    lon: userLon
  } = useLocation();
  const [search, setSearch] = useState("");
  const [centerLoc, setCenterLoc] = useState({
    name: globalCity || "My Region",
    lat: userLat || 12.9716,
    lon: userLon || 77.5946
  });
  const [manualCity, setManualCity] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [extraMandis, setExtraMandis] = useState([]);
  const [sortedMandis, setSortedMandis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedMandis, setExpandedMandis] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("distance");
  const [filterState, setFilterState] = useState(globalState || "All States");
  const itemsPerPage = 50;
  useEffect(() => {
    if (userLat && userLon) {
      setCenterLoc({
        name: globalCity || "My Location",
        lat: userLat,
        lon: userLon
      });
    }
  }, [userLat, userLon, globalCity]);
  useEffect(() => {
    const combined = [...extraMandis, ...ALL_MANDIS];
    const unique = Array.from(new Map(combined.map((m) => [m.name.toLowerCase(), m])).values());
    const withDistance = unique.map((m) => ({
      ...m,
      distance: calculateDistance(centerLoc.lat, centerLoc.lon, m.lat, m.lon)
    }));
    setSortedMandis(withDistance);
  }, [centerLoc, extraMandis]);
  const handleManualLocation = async () => {
    if (!manualCity.trim()) return;
    setIsGeocoding(true);
    setLoading(true);
    try {
      const coords = await geocodeCity({
        data: manualCity
      });
      setCenterLoc({
        name: manualCity,
        ...coords
      });
      const liveResults = await fetchLiveMandiPrices({
        data: manualCity
      });
      if (liveResults && liveResults.length > 0) {
        setExtraMandis((prev) => [...liveResults, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeocoding(false);
      setLoading(false);
    }
  };
  const toggleExpand = (id) => setExpandedMandis((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, manualCity, filterState, sortBy, centerLoc]);
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = sortedMandis.filter((m) => {
      const matchState = filterState === "All States" || m.state === filterState;
      if (!matchState) return false;
      if (!s) return true;
      return m.name.toLowerCase().includes(s) || m.state.toLowerCase().includes(s) || m.district.toLowerCase().includes(s) || m.commodities?.some((c) => c.name.toLowerCase().includes(s));
    });
    if (sortBy === "distance") list.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    else if (sortBy === "price_low") list.sort((a, b) => (a.commodities?.[0]?.price || 0) - (b.commodities?.[0]?.price || 0));
    else if (sortBy === "price_high") list.sort((a, b) => (b.commodities?.[0]?.price || 0) - (a.commodities?.[0]?.price || 0));
    return list;
  }, [sortedMandis, search, sortBy, filterState]);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const statesList = ["All States", ...new Set(ALL_MANDIS.map((m) => m.state))].sort();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground pb-20", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-b border-border bg-hero-gradient px-4 py-16 md:py-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-[10%] -left-[5%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-6xl text-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
          " Live Mandi Rates"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl", children: [
          "Mandi ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Intelligence" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed", children: "Real-time market prices for 3,000+ hubs. Search any location or crop to get regional insights instantly." }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-10 flex max-w-4xl flex-col gap-3 rounded-3xl border border-border bg-card p-2 shadow-soft sm:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-[1.2] items-center gap-3 px-4 py-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Type city...", className: "w-full bg-transparent font-medium outline-none", value: manualCity, onChange: (e) => setManualCity(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleManualLocation() }),
            /* @__PURE__ */ jsx("button", { onClick: handleManualLocation, disabled: isGeocoding, className: "rounded-xl bg-primary px-3 py-2 text-white shadow-sm hover:scale-[1.02]", children: isGeocoding ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden w-px bg-border sm:block my-2" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-3 px-4 py-2", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search crops...", className: "w-full bg-transparent font-medium outline-none", value: search, onChange: (e) => setSearch(e.target.value) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-10 max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Info, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none", children: "Database Status" }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold mt-1", children: [
              filtered.length,
              " Mandis Active"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold outline-none cursor-pointer", children: [
            /* @__PURE__ */ jsx("option", { value: "distance", children: "Nearest Markets" }),
            /* @__PURE__ */ jsx("option", { value: "price_low", children: "Price: Low to High" }),
            /* @__PURE__ */ jsx("option", { value: "price_high", children: "Price: High to Low" })
          ] }),
          /* @__PURE__ */ jsx("select", { value: filterState, onChange: (e) => setFilterState(e.target.value), className: "rounded-xl border border-border bg-background px-4 py-2 text-xs font-bold outline-none cursor-pointer", children: statesList.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2", children: loading ? Array(6).fill(0).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-64 animate-pulse rounded-3xl bg-card" }, i)) : paginated.length > 0 ? paginated.map((mandi) => {
        const expanded = expandedMandis.includes(mandi.id);
        return /* @__PURE__ */ jsxs("div", { className: "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/40 hover:shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold group-hover:text-primary transition-colors line-clamp-1", children: mandi.name }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 text-primary" }),
                mandi.district,
                ", ",
                mandi.state
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              mandi.distance !== void 0 && /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary border border-primary/20", children: [
                mandi.distance.toFixed(0),
                " KM"
              ] }),
              /* @__PURE__ */ jsx("a", { href: `https://www.google.com/maps/search/?api=1&query=${mandi.lat},${mandi.lon}`, target: "_blank", rel: "noreferrer", className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary border border-border", title: "Open in Google Maps", children: /* @__PURE__ */ jsx(Navigation2, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-2 gap-3", children: (expanded ? mandi.commodities : mandi.commodities?.slice(0, 4))?.map((c, idx) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:bg-background", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-muted-foreground uppercase line-clamp-1", children: c.name }),
              /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black ${c.trend === "up" ? "text-success" : "text-destructive"}`, children: c.trend === "up" ? "▲" : "▼" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
                "₹",
                c.price?.toLocaleString()
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground font-medium", children: "/Q" })
            ] })
          ] }, idx)) }),
          mandi.commodities?.length > 4 && /* @__PURE__ */ jsx("button", { onClick: () => toggleExpand(mandi.id), className: "mt-6 w-full rounded-2xl py-3 text-xs font-bold text-muted-foreground border border-border hover:bg-accent transition-colors", children: expanded ? "Show Less" : `View ${mandi.commodities.length - 4} More Prices` })
        ] }, mandi.id);
      }) : /* @__PURE__ */ jsxs("div", { className: "col-span-full py-24 text-center bg-card rounded-3xl border border-border shadow-soft", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Search, { className: "h-8 w-8 text-muted-foreground/30" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold", children: [
          'No local results for "',
          search,
          '"'
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-sm mx-auto px-4", children: "We couldn't find matches in our offline database. Try using the location search above to find live prices for this region." }),
        /* @__PURE__ */ jsxs("button", { onClick: () => {
          setManualCity(search);
          handleManualLocation();
        }, className: "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
          " Search India-wide via AI"
        ] })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "mt-16 flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setCurrentPage((p) => Math.max(1, p - 1));
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, disabled: currentPage === 1, className: "p-2 rounded-xl hover:bg-accent disabled:opacity-20", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("span", { className: "px-4 text-xs font-bold", children: [
            "Page ",
            currentPage,
            " of ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setCurrentPage((p) => Math.min(totalPages, p + 1));
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }, disabled: currentPage === totalPages, className: "p-2 rounded-xl hover:bg-accent disabled:opacity-20", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: Array.from({
          length: Math.min(totalPages, 6)
        }, (_, i) => /* @__PURE__ */ jsx("button", { onClick: () => {
          setCurrentPage(i + 1);
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }, className: `h-1.5 rounded-full transition-all ${currentPage === i + 1 ? "bg-primary w-8" : "bg-border w-3"}` }, i + 1)) })
      ] })
    ] })
  ] });
}
export {
  MandiPage as component
};
