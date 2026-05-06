import { jsxs, jsx } from "react/jsx-runtime";
import { Sprout, AlertTriangle, Cpu, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
function AboutPage() {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 py-12 md:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
        /* @__PURE__ */ jsx(Sprout, { className: "h-3.5 w-3.5" }),
        " ",
        t("Our mission")
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-4 font-display text-4xl font-extrabold sm:text-5xl", children: [
        t("Empowering farmers"),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: t("with AI") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground", children: t("Every year, billions of dollars in crops are lost to diseases caught too late. Farmassist AI puts a plant pathologist in every farmer's pocket.") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-5 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Block, { Icon: AlertTriangle, title: t("The problem"), tone: "earth", children: t("Smallholder farmers often lack timely access to agronomy experts. By the time a disease is identified, half the harvest may already be lost.") }),
      /* @__PURE__ */ jsx(Block, { Icon: Cpu, title: t("Our solution"), tone: "primary", children: t("A computer vision model trained on thousands of crop images detects disease, severity and recommends treatment — directly from a phone photo.") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-3xl border border-border bg-card p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl font-semibold", children: t("Our story") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: t("Born from a hackathon and grown alongside agricultural communities, Farmassist AI is built by a small team of engineers, agronomists and designers committed to making smart agriculture accessible — not just for big farms, but for every farmer with a phone.") })
    ] })
  ] });
}
function Block({
  Icon,
  title,
  children,
  tone
}) {
  const bg = tone === "primary" ? "bg-primary/12 text-primary" : "bg-earth/15 text-earth";
  return /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsx("span", { className: `inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children })
  ] });
}
export {
  AboutPage as component
};
