import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Loader2, AlertTriangle, CheckCircle2, Leaf, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { a as Route, s as supabase } from "./router-B23tt4C4.js";
import { c as createSsrRpc } from "./createSsrRpc-l1y8KE69.js";
import { c as createServerFn } from "../server.js";
import { l as leafspot } from "./disease-leafspot-aAOPdF91.js";
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
function getMockResult() {
  return {
    crop: "Unknown",
    disease: "Analysis Inconclusive",
    severity: "Medium",
    confidence: 0,
    treatment: ["Please try taking a clearer photo of the affected area.", "Ensure the plant is well-lit and the leaf is flat.", "If the issue persists, consult a local agricultural expert."],
    prevention: ["Maintain regular monitoring of your crops.", "Ensure proper irrigation and fertilization.", "Practice good field hygiene."],
    isFallback: true
  };
}
const analyzeWithGemini = createServerFn({
  method: "POST"
}).validator((data) => data).handler(createSsrRpc("b16ed1540eb3a15d6982d4e3c4e0e0344181a053c347f4f3921e3366c6e39dc9"));
async function transliterate(text, langCode) {
  if (!text || langCode === "en") return text;
  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=1`;
    const res = await fetch(url);
    if (!res.ok) return text;
    const data = await res.json();
    if (data[0] === "SUCCESS") {
      return data[1].map((r) => r[1][0]).join("");
    }
    return text;
  } catch (err) {
    console.error("Transliteration failed:", err);
    return text;
  }
}
const sevStyles = {
  Healthy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)] border-warning/40",
  High: "bg-destructive/12 text-destructive border-destructive/30"
};
function ResultsPage() {
  const search = Route.useSearch();
  const location = search.location || "Unknown";
  const {
    i18n
  } = useTranslation();
  const [result, setResult] = useState(null);
  const [displayResult, setDisplayResult] = useState(null);
  const [imgUrl, setImgUrl] = useState(leafspot);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transliterating, setTransliterating] = useState(false);
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        let currentImg = sessionStorage.getItem("pendingCropImage");
        let analysisB64 = "";
        let analysisMime = "image/jpeg";
        if (currentImg) {
          setImgUrl(currentImg);
          const commaIndex = currentImg.indexOf(",");
          if (commaIndex > -1) {
            const header = currentImg.substring(0, commaIndex);
            analysisB64 = currentImg.substring(commaIndex + 1);
            analysisMime = header.match(/:(.*?);/)?.[1] || "image/jpeg";
          }
        } else {
          const {
            data: {
              session
            }
          } = await supabase.auth.getSession();
          if (session) {
            const {
              data
            } = await supabase.from("user_scans").select("image_url").eq("user_id", session.user.id).order("created_at", {
              ascending: false
            }).limit(1).single();
            if (data?.image_url) {
              setImgUrl(data.image_url);
              currentImg = data.image_url;
              const imgResp = await fetch(data.image_url);
              const blob = await imgResp.blob();
              const b64DataUrl = await new Promise((res2) => {
                const reader = new FileReader();
                reader.onload = () => res2(reader.result);
                reader.readAsDataURL(blob);
              });
              const commaIndex = b64DataUrl.indexOf(",");
              analysisB64 = b64DataUrl.substring(commaIndex + 1);
              analysisMime = b64DataUrl.substring(0, commaIndex).match(/:(.*?);/)?.[1] || "image/jpeg";
            }
          }
        }
        if (!analysisB64) {
          setError("No image found. Please upload a crop photo first.");
          setLoading(false);
          return;
        }
        const analysis = await analyzeWithGemini({
          data: {
            base64Data: analysisB64,
            mimeType: analysisMime,
            location
          }
        });
        setResult(analysis);
        if (analysis && !analysis.error) {
          const lat = sessionStorage.getItem("pendingLat");
          const lon = sessionStorage.getItem("pendingLon");
          if (lat && lon) {
            const newAnalysis = {
              id: `realtime-${Date.now()}`,
              crop: analysis.crop || "Unknown",
              disease: analysis.disease || "Unknown",
              severity: analysis.severity || "Medium",
              lat: parseFloat(lat),
              lon: parseFloat(lon),
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              city: location,
              state: location,
              isRealtime: true
            };
            const existing = JSON.parse(localStorage.getItem("communityAnalyses") || "[]");
            localStorage.setItem("communityAnalyses", JSON.stringify([newAnalysis, ...existing].slice(0, 50)));
            console.log("HEATMAP_SYNC: Diagnosis pushed to CropWatch.");
          }
        }
      } catch (err) {
        console.error("Critical failure in analysis pipeline:", err);
        setResult(getMockResult());
      } finally {
        setLoading(false);
      }
    };
    runAnalysis();
  }, [location]);
  useEffect(() => {
    if (!result) return;
    const applyTransliteration = async () => {
      const lang = i18n.language;
      if (lang === "en") {
        setDisplayResult(result);
        return;
      }
      setTransliterating(true);
      try {
        const trans = {
          ...result
        };
        trans.crop = await transliterate(result.crop, lang);
        trans.disease = await transliterate(result.disease, lang);
        trans.symptoms = await transliterate(result.symptoms, lang);
        if (result.treatment) {
          trans.treatment = await Promise.all(result.treatment.map((t) => transliterate(t, lang)));
        }
        if (result.prevention) {
          trans.prevention = await Promise.all(result.prevention.map((t) => transliterate(t, lang)));
        }
        setDisplayResult(trans);
      } catch (err) {
        console.error("Transliteration error:", err);
        setDisplayResult(result);
      } finally {
        setTransliterating(false);
      }
    };
    applyTransliteration();
  }, [result, i18n.language]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-primary" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-semibold", children: "Gemini is analyzing your crop..." }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Scanning for diseases, pests, and local treatments." })
    ] });
  }
  if (error || !result || result.error) {
    const errorTitle = result?.error || "Analysis Failed";
    const errorMsg = result?.details || error || "We couldn't analyze the image. Please try uploading again.";
    return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "h-10 w-10 text-destructive" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-semibold", children: errorTitle }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: errorMsg }),
      /* @__PURE__ */ jsx(Link, { to: "/analyze", className: "mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: "Try again" })
    ] });
  }
  const res = displayResult || result;
  if (!res) return null;
  const sev = res.severity || "Medium";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-10 md:py-14", children: [
    transliterating && /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary animate-pulse", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }),
      " Translating results to your script..."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-[1.1fr_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsx("img", { src: imgUrl, alt: res.disease, className: "aspect-[4/3] w-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Crop" }),
            /* @__PURE__ */ jsx("p", { className: "font-display text-lg font-semibold", children: res.crop })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${sevStyles[sev] || sevStyles["Medium"]}`, children: [
            sev === "Healthy" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(AlertTriangle, { className: "h-3.5 w-3.5" }),
            "Severity: ",
            sev
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
          /* @__PURE__ */ jsx(Leaf, { className: "h-3.5 w-3.5" }),
          " Diagnosis"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-3xl font-bold leading-tight", children: res.disease }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Confidence: ",
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-foreground", children: [
            res.confidence,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 h-2 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary transition-all", style: {
          width: `${res.confidence}%`
        } }) }),
        res.symptoms && /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-primary/5 p-4 border border-primary/10", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-primary/70", children: "Observed Symptoms" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-sm leading-relaxed text-foreground/80 italic", children: [
            '"',
            res.symptoms,
            '"'
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-3", children: /* @__PURE__ */ jsxs(Link, { to: "/library", className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
          " Learn more"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(DiagnosisCard, { title: "Treatment", items: res.treatment, tone: "primary" }),
      /* @__PURE__ */ jsx(DiagnosisCard, { title: "Prevention", items: res.prevention, tone: "earth" })
    ] })
  ] });
}
function DiagnosisCard({
  title,
  items,
  tone
}) {
  const dot = tone === "primary" ? "bg-primary" : "bg-earth";
  return /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-semibold", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: (items || []).map((t, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: `mt-2 h-2 w-2 flex-none rounded-full ${dot}` }),
      /* @__PURE__ */ jsx("span", { className: "text-foreground/90", children: t })
    ] }, i)) })
  ] });
}
export {
  ResultsPage as component
};
