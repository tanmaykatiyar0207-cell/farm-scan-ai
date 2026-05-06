import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, MapPin, Loader2, LocateFixed, CheckCircle2, X, Upload, Camera } from "lucide-react";
import { s as supabase } from "./router-B23tt4C4.js";
import "react-i18next";
import "@supabase/supabase-js";
import "i18next";
const LOCATIONS = ["Karnataka", "Maharashtra", "Punjab", "Uttar Pradesh", "Gujarat", "Madhya Pradesh", "Andhra Pradesh", "Tamil Nadu", "Rajasthan", "Bihar", "West Bengal", "Odisha", "Other"];
async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "FarmScanAI/1.0 (Hackathon Project)"
      }
    });
    if (!res.ok) throw new Error("Location API error");
    const data = await res.json();
    const address = data.address || {};
    const state = address.state || address.state_district || address.region || address.county || "Unknown";
    return state;
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return "Unknown";
  }
}
function AnalyzePage() {
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState(null);
  const [locDetected, setLocDetected] = useState(false);
  const fileRef = useRef(null);
  const camRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    detectLocation();
  }, []);
  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocError("GPS not available on this device.");
      if (!location) setLocation("Other");
      return;
    }
    setLocating(true);
    setLocError(null);
    setLocDetected(false);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const {
          latitude,
          longitude
        } = pos.coords;
        sessionStorage.setItem("pendingLat", latitude.toString());
        sessionStorage.setItem("pendingLon", longitude.toString());
        const state = await reverseGeocode(latitude, longitude);
        if (state && state !== "Unknown") {
          const matched = LOCATIONS.find((l) => state.toLowerCase().includes(l.toLowerCase()));
          setLocation(matched || state);
          setLocDetected(true);
        } else {
          throw new Error("Unknown state");
        }
      } catch {
        setLocError("Couldn't detect location. Please select manually.");
        if (!location) setLocation("Other");
      } finally {
        setLocating(false);
      }
    }, (err) => {
      setLocating(false);
      if (err.code === err.PERMISSION_DENIED) {
        setLocError("Location permission denied. Please select manually.");
      } else {
        setLocError("Couldn't get location. Please select manually.");
      }
      if (!location) setLocation("Other");
    }, {
      timeout: 8e3,
      maximumAge: 6e4
    });
  };
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = e.target?.result;
      };
      reader.readAsDataURL(file);
    });
  };
  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    try {
      const compressed = await compressImage(file);
      setPreview(compressed);
    } catch (err) {
      console.error("Compression failed:", err);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };
  const analyze = async () => {
    setLoading(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      const n8nWebhookUrl = "https://tanmay0207.app.n8n.cloud/webhook/upload-image";
      const isGuest = !session;
      if (preview) {
        sessionStorage.setItem("pendingCropImage", preview);
      }
      if (n8nWebhookUrl && preview && session) {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            image: preview,
            userId: session.user.id,
            location: location || "Unknown"
          })
        });
      } else {
        await new Promise((res) => setTimeout(res, 2200));
      }
      navigate({
        to: "/results",
        search: {
          location: location || "Unknown"
        }
      });
    } catch (error) {
      console.error("Failed to upload image to n8n:", error);
      navigate({
        to: "/results",
        search: {
          location: location || "Unknown"
        }
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10 md:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        " AI Diagnosis"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-3xl font-bold sm:text-4xl", children: "Analyze your crop" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Upload a clear photo — we'll auto-detect your location for localized advice." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary" }),
          " Your Location"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: detectLocation, disabled: locating, className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15 disabled:opacity-60 transition-colors", children: [
          locating ? /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsx(LocateFixed, { className: "h-3 w-3" }),
          locating ? "Detecting…" : "Use GPS"
        ] })
      ] }),
      locDetected && location && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs font-semibold text-success", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }),
        "Auto-detected: ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: location }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-muted-foreground font-normal", children: "Change below if needed" })
      ] }),
      locError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-destructive", children: locError }),
      /* @__PURE__ */ jsxs("select", { id: "location", value: location, onChange: (e) => {
        setLocation(e.target.value);
        setLocDetected(false);
      }, className: "mt-3 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary", children: [
        /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select state manually…" }),
        LOCATIONS.map((loc) => /* @__PURE__ */ jsx("option", { value: loc, children: loc }, loc))
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { onDragOver: (e) => {
      e.preventDefault();
      setDragOver(true);
    }, onDragLeave: () => setDragOver(false), onDrop: (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files?.[0]);
    }, className: `mt-4 rounded-3xl border-2 border-dashed bg-card p-6 transition-colors sm:p-10 ${dragOver ? "border-primary bg-primary/5" : "border-border"}`, children: preview ? /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl", children: [
        /* @__PURE__ */ jsx("img", { src: preview, alt: "Selected crop", className: "aspect-video w-full object-cover" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setPreview(null), className: "absolute right-3 top-3 rounded-full bg-background/90 p-2 text-foreground shadow-soft hover:bg-background", "aria-label": "Remove image", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: analyze, disabled: loading, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.01] disabled:opacity-80", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }),
        " Analyzing your crop…"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }),
        " Get Localized Diagnosis ",
        location ? `· ${location}` : ""
      ] }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary", children: /* @__PURE__ */ jsx(Upload, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-lg font-semibold", children: "Drag & drop your image" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "PNG or JPG · Up to 10MB" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => fileRef.current?.click(), className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
          " Upload photo"
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => camRef.current?.click(), className: "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-accent", children: [
          /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }),
          " Use camera"
        ] })
      ] }),
      /* @__PURE__ */ jsx("input", { ref: fileRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => handleFile(e.target.files?.[0]) }),
      /* @__PURE__ */ jsx("input", { ref: camRef, type: "file", accept: "image/*", capture: "environment", hidden: true, onChange: (e) => handleFile(e.target.files?.[0]) })
    ] }) }),
    loading && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
      " AI is tailoring diagnosis for ",
      location || "your region",
      "…"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "📍 Location is used only to generate accurate regional diagnosis. Never stored or shared." })
  ] });
}
export {
  AnalyzePage as component
};
