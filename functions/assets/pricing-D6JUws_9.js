import { jsxs, jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
function PricingPage() {
  const {
    t
  } = useTranslation();
  const handlePayment = (amount, planName) => {
    const Razorpay = window.Razorpay;
    if (!Razorpay) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }
    const options = {
      key: "rzp_test_placeholder",
      // Replace with real key for production
      amount: amount * 100,
      // Amount in paise
      currency: "INR",
      name: "Farmassist AI",
      description: `Upgrade to ${planName}`,
      image: "/logo.png",
      handler: function(response) {
        alert(`Payment Successful!
Payment ID: ${response.razorpay_payment_id}
Your account will be upgraded to ${planName} shortly.`);
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
        color: "#10b981"
        // Primary emerald color
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-16 md:py-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl font-extrabold sm:text-5xl", children: t("Simple, transparent pricing") }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: t("Choose the plan that best fits your farm's needs.") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-8 shadow-soft transition-transform hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-semibold text-foreground", children: t("Daily Pass") }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Perfect for one-time crop checks or emergencies.") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold", children: "₹99" }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "/ ",
            t("day")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Unlimited AI diagnoses for 24 hours")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Detailed severity reports")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Immediate treatment advice")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Access in all supported languages")
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => handlePayment(99, "Daily Pass"), className: "mt-8 w-full rounded-full bg-primary/10 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20", children: t("Get Daily Pass") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl transition-transform hover:-translate-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground", children: t("Most Popular") }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-semibold text-foreground", children: t("Monthly Pro") }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("Ideal for ongoing crop monitoring and seasonal care.") }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-5xl font-extrabold", children: "₹999" }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "/ ",
            t("month")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Everything in Daily Pass")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Priority AI processing")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Unlimited history storage")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-primary" }),
            " ",
            t("Early access to new features")
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => handlePayment(999, "Monthly Pro"), className: "mt-8 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90", children: t("Subscribe Now") })
      ] })
    ] })
  ] });
}
export {
  PricingPage as component
};
