import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { l as leafspot } from "./disease-leafspot-aAOPdF91.js";
import { Calendar } from "lucide-react";
const mildew = "/assets/disease-mildew-BHJMemQW.jpg";
const rust = "/assets/disease-rust-QyhX6nhQ.jpg";
const items = [{
  img: leafspot,
  crop: "Tomato",
  disease: "Early Leaf Spot",
  date: "May 2, 2026",
  sev: "Medium"
}, {
  img: mildew,
  crop: "Grape",
  disease: "Powdery Mildew",
  date: "Apr 28, 2026",
  sev: "High"
}, {
  img: rust,
  crop: "Wheat",
  disease: "Leaf Rust",
  date: "Apr 24, 2026",
  sev: "Medium"
}, {
  img: leafspot,
  crop: "Beans",
  disease: "Healthy",
  date: "Apr 20, 2026",
  sev: "Healthy"
}];
const sevColor = {
  Healthy: "bg-success/15 text-success",
  Medium: "bg-warning/20 text-[oklch(0.45_0.15_70)]",
  High: "bg-destructive/12 text-destructive"
};
function HistoryPage() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10 md:py-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold", children: "History" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Your previous crop scans" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/analyze", className: "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft", children: "New scan" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: items.map((it, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/results", className: "flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card", children: [
      /* @__PURE__ */ jsx("img", { src: it.img, alt: it.disease, className: "h-16 w-16 flex-none rounded-xl object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-base font-semibold", children: it.disease }),
          /* @__PURE__ */ jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sevColor[it.sev]}`, children: it.sev })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: it.crop }),
        /* @__PURE__ */ jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
          " ",
          it.date
        ] })
      ] })
    ] }) }, i)) })
  ] });
}
export {
  HistoryPage as component
};
