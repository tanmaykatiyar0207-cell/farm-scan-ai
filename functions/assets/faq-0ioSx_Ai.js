import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
const qs = [{
  q: "How do I scan my crop for diseases?",
  a: "Simply navigate to the 'Analyze' tab and upload a clear photo of the infected plant leaf. Our AI will analyze the image and provide a diagnosis, severity report, and treatment plan in seconds."
}, {
  q: "What are your pricing plans?",
  a: "We offer two flexible plans: a Daily Pass for ₹99 (ideal for one-time checks) and a Monthly Pro subscription for ₹999 (perfect for ongoing seasonal monitoring and priority AI processing)."
}, {
  q: "Which languages are supported?",
  a: "Farmassist AI is fully localized in English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ). You can easily switch your preferred language using the toggle button in the top navigation bar."
}, {
  q: "How many crop diseases can the AI detect?",
  a: "Our AI model is trained to identify 150 major crop diseases affecting a wide variety of plants—from wheat and tomatoes to coffee and cocoa. You can browse the full list in our Disease Library."
}, {
  q: "Are my crop photos stored securely?",
  a: "Yes. Your privacy is our priority. Images are processed securely for diagnosis and are never shared or sold to third parties."
}, {
  q: "Do I need an internet connection to use Farmassist AI?",
  a: "Yes, currently an active internet connection is required to process the images through our advanced AI models in the cloud."
}, {
  q: "How accurate is the disease detection?",
  a: "Our AI models are trained on hundreds of thousands of high-resolution crop images, providing industry-leading accuracy. However, for critical or widespread field infections, we always recommend verifying with a local agronomist."
}, {
  q: "Can I view my past crop scans?",
  a: "Yes! All your previous scans, diagnoses, and recommended treatment plans are securely saved in your History tab, allowing you to easily track your crop's health over the season."
}, {
  q: "What should I do if the AI cannot identify the disease?",
  a: "First, ensure your photo is well-lit, in focus, and clearly shows the symptoms on the leaf or fruit. If the issue still isn't recognized, the specific disease might fall outside our current 150-disease database, though we are constantly updating it."
}, {
  q: "Can I change or cancel my Monthly Pro subscription?",
  a: "Absolutely. You have full control over your billing and can easily cancel or modify your monthly subscription at any time directly from your Profile settings."
}];
function FAQPage() {
  const {
    t
  } = useTranslation();
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-12 md:py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl font-extrabold", children: t("Frequently asked") }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: t("Quick answers about how Farmassist AI works.") })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-8 space-y-3", children: qs.map((item, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxs("li", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "flex w-full items-center justify-between gap-3 px-5 py-4 text-left", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-base font-semibold", children: t(item.q) }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 flex-none text-primary transition-transform ${isOpen ? "rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-sm text-muted-foreground", children: t(item.a) }) }) })
      ] }, i);
    }) })
  ] });
}
export {
  FAQPage as component
};
