import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  { q: "Is Farmassist AI free to use?", a: "Yes — the Free plan includes 20 scans per day. Upgrade to Pro for unlimited scans and exports." },
  { q: "How accurate is the AI?", a: "Our model achieves over 92% accuracy on common crop diseases. Always confirm severe cases with a local agronomist." },
  { q: "Which crops are supported?", a: "We currently support tomato, wheat, rice, maize, grape, beans, potato and several leafy greens, with more added monthly." },
  { q: "Do you store my images?", a: "Images are processed securely and deleted after analysis unless you save them to your history. We never sell or share your data." },
  { q: "Does it work offline?", a: "An offline mode is in development. Today, an internet connection is needed to run analysis." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold">Frequently asked</h1>
        <p className="mt-2 text-muted-foreground">Quick answers about how Farmassist AI works.</p>
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
                <span className="font-display text-base font-semibold">{item.q}</span>
                <ChevronDown className={`h-5 w-5 flex-none text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
