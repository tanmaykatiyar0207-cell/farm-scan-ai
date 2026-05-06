import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [{ title: "Pricing — Farmassist AI" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { t } = useTranslation();

  const handlePayment = (amount: number, planName: string) => {
    const Razorpay = (window as any).Razorpay;
    
    if (!Razorpay) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_test_placeholder", // Replace with real key for production
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Farmassist AI",
      description: `Upgrade to ${planName}`,
      image: "/logo.png",
      handler: function (response: any) {
        alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}\nYour account will be upgraded to ${planName} shortly.`);
      },
      prefill: {
        name: "Indian Farmer",
        email: "farmer@example.com",
        contact: "9999999999"
      },
      notes: {
        plan: planName
      },
      theme: {
        color: "#10b981" // Primary emerald color
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="text-center">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">{t("Simple, transparent pricing")}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("Choose the plan that best fits your farm's needs.")}</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
        {/* 1 Day Plan */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-card">
          <h3 className="font-display text-2xl font-semibold text-foreground">{t("Daily Pass")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("Perfect for one-time crop checks or emergencies.")}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-extrabold">₹99</span>
            <span className="text-muted-foreground">/ {t("day")}</span>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Unlimited AI diagnoses for 24 hours")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Detailed severity reports")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Immediate treatment advice")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Access in all supported languages")}</li>
          </ul>
          <button 
            onClick={() => handlePayment(99, "Daily Pass")}
            className="mt-8 w-full rounded-full bg-primary/10 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            {t("Get Daily Pass")}
          </button>
        </div>

        {/* 1 Month Plan */}
        <div className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl transition-transform hover:-translate-y-1">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {t("Most Popular")}
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground">{t("Monthly Pro")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("Ideal for ongoing crop monitoring and seasonal care.")}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-5xl font-extrabold">₹999</span>
            <span className="text-muted-foreground">/ {t("month")}</span>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Everything in Daily Pass")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Priority AI processing")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Unlimited history storage")}</li>
            <li className="flex items-center gap-3 text-sm"><Check className="h-5 w-5 text-primary" /> {t("Early access to new features")}</li>
          </ul>
          <button 
            onClick={() => handlePayment(999, "Monthly Pro")}
            className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("Subscribe Now")}
          </button>
        </div>
      </div>
    </div>
  );
}
