import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Farmassist AI" },
      { name: "description", content: "Frequently asked questions about Farmassist AI." },
    ],
  }),
  component: FAQPage,
});

const qs = [
  { q: "How do I scan my crop for diseases?", a: "Simply navigate to the 'Analyze' tab and upload a clear photo of the infected plant leaf. Our AI will analyze the image and provide a diagnosis, severity report, and treatment plan in seconds." },
  { q: "What are your pricing plans?", a: "We offer two flexible plans: a Daily Pass for ₹99 (ideal for one-time checks) and a Monthly Pro subscription for ₹999 (perfect for ongoing seasonal monitoring and priority AI processing)." },
  { q: "Which languages are supported?", a: "Farmassist AI is fully localized in English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ). You can easily switch your preferred language using the toggle button in the top navigation bar." },
  { q: "How many crop diseases can the AI detect?", a: "Our AI model is trained to identify 150 major crop diseases affecting a wide variety of plants—from wheat and tomatoes to coffee and cocoa. You can browse the full list in our Disease Library." },
  { q: "Are my crop photos stored securely?", a: "Yes. Your privacy is our priority. Images are processed securely for diagnosis and are never shared or sold to third parties." },
  { q: "Do I need an internet connection to use Farmassist AI?", a: "Yes, currently an active internet connection is required to process the images through our advanced AI models in the cloud." },
  { q: "How accurate is the disease detection?", a: "Our AI models are trained on hundreds of thousands of high-resolution crop images, providing industry-leading accuracy. However, for critical or widespread field infections, we always recommend verifying with a local agronomist." },
  { q: "Can I view my past crop scans?", a: "Yes! All your previous scans, diagnoses, and recommended treatment plans are securely saved in your History tab, allowing you to easily track your crop's health over the season." },
  { q: "What should I do if the AI cannot identify the disease?", a: "First, ensure your photo is well-lit, in focus, and clearly shows the symptoms on the leaf or fruit. If the issue still isn't recognized, the specific disease might fall outside our current 150-disease database, though we are constantly updating it." },
  { q: "Can I change or cancel my Monthly Pro subscription?", a: "Absolutely. You have full control over your billing and can easily cancel or modify your monthly subscription at any time directly from your Profile settings." },
];

function FAQPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold">{t("Frequently asked")}</h1>
        <p className="mt-2 text-muted-foreground">{t("Quick answers about how Farmassist AI works.")}</p>
      </div>
      <ul className="mt-8 space-y-3">
        {qs.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-semibold">{t(item.q)}</span>
                <ChevronDown className={`h-5 w-5 flex-none text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{t(item.a)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
