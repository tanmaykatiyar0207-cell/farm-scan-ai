import { jsxs, jsx } from "react/jsx-runtime";
import { Sprout, Wheat, TrendingUp, HeartHandshake } from "lucide-react";
function SDGPage() {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-12 md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "h-3.5 w-3.5" }),
        " Sustainable Impact"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-display text-4xl font-extrabold sm:text-5xl", children: "SDG Alignment" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-muted-foreground", children: "Farmassist AI is built to advance the United Nations Sustainable Development Goals through accessible technology." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx(SDGCard, { n: "02", color: "bg-[#e5243b]", title: "Zero Hunger", Icon: Wheat, desc: "By detecting crop diseases early, we help reduce food loss and improve yields for smallholder farmers worldwide." }),
      /* @__PURE__ */ jsx(SDGCard, { n: "12", color: "bg-[#bf8b2e]", title: "Responsible Consumption", Icon: Sprout, desc: "Targeted diagnosis reduces unnecessary pesticide use, preventing chemical runoff and promoting soil health." }),
      /* @__PURE__ */ jsx(SDGCard, { n: "08", color: "bg-[#a21942]", title: "Economic Growth", Icon: TrendingUp, desc: "Healthier harvests mean better incomes — supporting resilient rural economies and farming livelihoods." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-4 sm:grid-cols-3", children: [{
      k: "30%",
      v: "potential reduction in crop loss"
    }, {
      k: "5s",
      v: "to diagnose any photo"
    }, {
      k: "24/7",
      v: "real-time regional monitoring"
    }].map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx("p", { className: "font-display text-4xl font-extrabold text-primary", children: s.k }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: s.v })
    ] }, s.k)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-start gap-4 rounded-3xl border border-primary/20 bg-primary/8 p-6", children: [
      /* @__PURE__ */ jsx(HeartHandshake, { className: "mt-1 h-6 w-6 flex-none text-primary" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/90", children: "We're committed to keeping a free tier so that the farmers who need this technology most never get priced out of it." })
    ] })
  ] });
}
function SDGCard({
  n,
  color,
  title,
  Icon,
  desc
}) {
  return /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden rounded-3xl p-6 text-white shadow-card ${color}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("span", { className: "font-display text-5xl font-extrabold opacity-30", children: n })
    ] }),
    /* @__PURE__ */ jsxs("h3", { className: "mt-4 font-display text-xl font-bold", children: [
      "SDG ",
      n,
      " · ",
      title
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/90", children: desc })
  ] });
}
export {
  SDGPage as component
};
