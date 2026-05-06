import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import { User, Home, Camera, Landmark, History, AlertTriangle, Sparkles, ArrowRight, ShieldCheck, Zap, Leaf, MapPin, Navigation, Sun, Droplets, Wind, Users, ChevronDown } from "lucide-react";
import { useTranslation, initReactI18next } from "react-i18next";
import { useState, useEffect, createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import i18n from "i18next";
const appCss = "/assets/styles-_tUs36Ou.css";
const logo = "/assets/logo-fooDYxSG.png";
function Logo({ className = "h-9 w-auto" }) {
  return /* @__PURE__ */ jsx("img", { src: logo, alt: "Farmassist AI", className });
}
const supabaseUrl = "https://jkkqinudvjlitqtauiyn.supabase.co";
const supabaseAnonKey = "sb_publishable_-BIz_OgKKjZEvkab0Vr-nQ_1O_4GI4I";
const supabase = !supabaseUrl.includes("your-project") ? createClient(supabaseUrl, supabaseAnonKey) : {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {
    } } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => ({
            single: async () => ({ data: null, error: null })
          })
        })
      })
    })
  })
};
const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/heatmap", label: "CropWatch" },
  { to: "/library", label: "Library" },
  { to: "/mandi", label: "Markets" },
  { to: "/schemes", label: "Schemes" },
  { to: "/pricing", label: "Pricing" }
];
function Navbar() {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session2) => {
      setSession(session2);
    });
    return () => subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsx("header", { className: "relative z-40 w-full border-b border-border/60 bg-background/85", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Logo, { className: "h-12 w-12 rounded-lg shadow-sm" }),
      /* @__PURE__ */ jsxs("span", { className: "font-display text-2xl font-bold tracking-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Farm" }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "assist" }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 text-sm font-semibold text-primary-soft", children: "AI" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-1 md:flex", children: links.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        className: "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        activeOptions: { exact: l.to === "/" },
        activeProps: { className: "bg-accent text-accent-foreground" },
        children: t(l.label)
      },
      l.to
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      session ? /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/profile",
          className: "hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent md:inline-flex",
          children: [
            /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
            " ",
            t("Profile")
          ]
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/login",
          className: "hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent md:inline-flex",
          children: t("Sign In")
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/analyze",
          className: "hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] md:inline-flex",
          children: t("Try Now")
        }
      )
    ] })
  ] }) });
}
function Footer() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx("footer", { className: "mt-16 border-t border-border bg-card/40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Logo, { className: "h-10 w-10 rounded-md" }),
          /* @__PURE__ */ jsx("span", { className: "font-display text-xl font-bold", children: "Farmassist AI" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-xs text-sm text-muted-foreground", children: t("Smart advice. Better harvests. AI-powered crop disease detection for every farmer.") })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-semibold", children: t("Product") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/analyze", className: "hover:text-primary", children: t("Analyze") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/library", className: "hover:text-primary", children: t("Disease Library") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/faq", className: "hover:text-primary", children: t("FAQ") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-semibold", children: t("Impact") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/sdg", className: "hover:text-primary", children: t("SDG Alignment") }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: t("Your images are processed securely and never sold.") }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Farmassist AI. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Made with 🌱 for farmers." })
    ] })
  ] }) });
}
const items = [
  { to: "/", label: "Home", Icon: Home, exact: true },
  { to: "/analyze", label: "Analyze", Icon: Camera, exact: false },
  { to: "/schemes", label: "Schemes", Icon: Landmark, exact: false },
  { to: "/history", label: "History", Icon: History, exact: false },
  { to: "/profile", label: "Profile", Icon: User, exact: false }
];
function BottomTabBar() {
  return /* @__PURE__ */ jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden", children: /* @__PURE__ */ jsx("ul", { className: "mx-auto grid max-w-md grid-cols-5", children: items.map(({ to, label, Icon, exact }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
    Link,
    {
      to,
      activeOptions: { exact },
      activeProps: { className: "text-primary" },
      inactiveProps: { className: "text-muted-foreground" },
      className: "flex flex-col items-center gap-0.5 px-2 pb-2 pt-2.5 text-[11px] font-medium transition-colors",
      children: ({ isActive }) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: `flex h-9 w-12 items-center justify-center rounded-full transition-colors ${isActive ? "bg-primary/12" : ""}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", strokeWidth: isActive ? 2.4 : 2 }) }),
        label
      ] })
    }
  ) }, to)) }) });
}
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: {} },
    hi: { translation: {} },
    kn: { translation: {} }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
const LocationContext = createContext(void 0);
function LocationProvider({ children }) {
  const [city, setCity] = useState("");
  const [state, setState] = useState("Karnataka");
  const [lat, setLat] = useState(12.9716);
  const [lon, setLon] = useState(77.5946);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const saved = localStorage.getItem("farm_scan_location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCity(parsed.city);
        setState(parsed.state);
        setLat(parsed.lat);
        setLon(parsed.lon);
      } catch (e) {
      }
    }
    setIsLoading(false);
  }, []);
  const setLocation = (newCity, newState, newLat, newLon) => {
    setCity(newCity);
    setState(newState);
    setLat(newLat);
    setLon(newLon);
    localStorage.setItem("farm_scan_location", JSON.stringify({ city: newCity, state: newState, lat: newLat, lon: newLon }));
  };
  return /* @__PURE__ */ jsx(LocationContext.Provider, { value: { city, state, lat, lon, setLocation, isLoading }, children });
}
function useLocation() {
  const context = useContext(LocationContext);
  if (context === void 0) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-primary font-display", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error }) {
  console.error("Global Error Caught:", error);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold", children: "Oops! Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "Our servers encountered a temporary issue. Please refresh the page or try again in a moment." }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => window.location.reload(),
        className: "mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:scale-105 transition-all",
        children: "Refresh Page"
      }
    )
  ] }) });
}
const Route$e = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Farmassist AI — Smart advice. Better harvests." },
      { name: "description", content: "AI-powered crop disease detection. Upload a photo and get instant diagnosis, severity and treatment in seconds." },
      { property: "og:title", content: "Farmassist AI" },
      { property: "og:description", content: "AI-powered crop disease detection for farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" }
    ],
    scripts: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/leaflet.markercluster.js" },
      { src: "https://checkout.razorpay.com/v1/checkout.js" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(LocationProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pb-20 md:pb-0", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(BottomTabBar, {})
  ] }) });
}
const $$splitComponentImporter$c = () => import("./sdg-BOzwVvo3.js");
const Route$d = createFileRoute("/sdg")({
  head: () => ({
    meta: [{
      title: "SDG Alignment — Farmassist AI"
    }, {
      name: "description",
      content: "How Farmassist AI supports UN Sustainable Development Goals."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const INDIAN_SCHEMES = [
  // --- FINANCIAL AID ---
  {
    id: "pm-kisan",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "financial",
    description: "Annual income support of ₹6,000 for all landholding farmer families in three equal installments.",
    states: ["All India"],
    link: "https://pmkisan.gov.in/"
  },
  {
    id: "kcc",
    title: "Kisan Credit Card (KCC)",
    category: "financial",
    description: "Credit scheme providing farmers with access to affordable short-term loans for cultivation and farm maintenance.",
    states: ["All India"],
    link: "https://www.myscheme.gov.in/schemes/kcc"
  },
  {
    id: "enam",
    title: "e-NAM (National Agriculture Market)",
    category: "financial",
    description: "Online trading platform for agricultural commodities, ensuring better price discovery for farmers across India.",
    states: ["All India"],
    link: "https://www.enam.gov.in/"
  },
  {
    id: "pmkmy",
    title: "PM Kisan Maandhan Yojana",
    category: "financial",
    description: "Old-age pension scheme for Small and Marginal Farmers (SMF) providing a monthly pension of ₹3,000.",
    states: ["All India"],
    link: "https://maandhan.in/"
  },
  {
    id: "iss",
    title: "Interest Subvention Scheme (ISS)",
    category: "financial",
    description: "Provides short-term crop loans up to ₹3 lakh at a subsidized interest rate of 7% per annum.",
    states: ["All India"],
    link: "https://pib.gov.in/PressReleasePage.aspx?PRID=1852445"
  },
  {
    id: "pmmsy",
    title: "PM Matsya Sampada Yojana (PMMSY)",
    category: "financial",
    description: "Flagship scheme for focused and sustainable development of the fisheries sector in India.",
    states: ["All India"],
    link: "https://pmmsy.dof.gov.in/"
  },
  {
    id: "mksp",
    title: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
    category: "financial",
    description: "Sub-component of NRLM to empower women in agriculture by making systematic investments to enhance their participation.",
    states: ["All India"],
    link: "https://mksp.dac.gov.in/"
  },
  {
    id: "fpo-support",
    title: "Formation of 10,000 FPOs",
    category: "financial",
    description: "Central scheme to provide financial and technical support to form and promote Farmer Producer Organizations.",
    states: ["All India"],
    link: "https://sfacindia.com/"
  },
  {
    id: "vca",
    title: "Venture Capital Assistance (VCA)",
    category: "financial",
    description: "Financial support in the form of interest-free loans to agri-business projects to reduce their cost of capital.",
    states: ["All India"],
    link: "https://sfacindia.com/VCA-Scheme.aspx"
  },
  {
    id: "agri-clinic",
    title: "Agri-Clinics & Agri-Business Centres (ACABC)",
    category: "financial",
    description: "Providing professional extension services to farmers and supporting agri-entrepreneurship for unemployed youth.",
    states: ["All India"],
    link: "https://www.acabc.gov.in/"
  },
  // --- CROP INSURANCE ---
  {
    id: "pmfby",
    title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "insurance",
    description: "Low-premium crop insurance protecting farmers against yield loss due to non-preventable risks.",
    states: ["All India"],
    link: "https://pmfby.gov.in/"
  },
  {
    id: "rwbcis",
    title: "Restructured Weather Based Crop Insurance Scheme",
    category: "insurance",
    description: "Provides insurance for crops based on weather parameters like rainfall, temperature, and humidity.",
    states: ["All India"],
    link: "https://pmfby.gov.in/"
  },
  {
    id: "livestock-insurance",
    title: "Livestock Insurance Scheme",
    category: "insurance",
    description: "Provides protection to farmers and cattle rearers against loss of animals due to death.",
    states: ["All India"],
    link: "https://dahd.nic.in/schemes/programmes/livestock-insurance-scheme"
  },
  {
    id: "up-kisan-bima",
    title: "Mukhya Mantri Krishak Durghatna Kalyan Yojana",
    category: "insurance",
    description: "Provides financial assistance to farmers/nominees in case of accidental death or disability.",
    states: ["Uttar Pradesh"],
    link: "https://upagriculture.com/"
  },
  // --- EQUIPMENT & INFRASTRUCTURE ---
  {
    id: "pmksy",
    title: "PMKSY (Pradhan Mantri Krishi Sinchai Yojana)",
    category: "equipment",
    description: "Focused on expanding cultivable area under assured irrigation and improving on-farm water use efficiency.",
    states: ["All India"],
    link: "https://pmksy.gov.in/"
  },
  {
    id: "soil-health",
    title: "Soil Health Card Scheme",
    category: "equipment",
    description: "Analyzing soil quality and providing crop-wise fertilizer recommendations through health cards.",
    states: ["All India"],
    link: "https://soilhealth.dac.gov.in/"
  },
  {
    id: "pm-kusum",
    title: "PM-KUSUM (Solar Pump Scheme)",
    category: "equipment",
    description: "Subsidies for setting up solar pumps and grid-connected solar power plants on barren lands.",
    states: ["All India"],
    link: "https://pmkusum.mnre.gov.in/"
  },
  {
    id: "smam",
    title: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "equipment",
    description: "Promoting agricultural mechanization among small and marginal farmers to reduce manual labor.",
    states: ["All India"],
    link: "https://farmech.dac.gov.in/"
  },
  {
    id: "midh",
    title: "Mission for Integrated Development of Horticulture",
    category: "equipment",
    description: "Supports holistic growth of the horticulture sector, including fruits, vegetables, and flowers.",
    states: ["All India"],
    link: "https://midh.gov.in/"
  },
  {
    id: "pkvy",
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    category: "equipment",
    description: "Promotes organic farming through a cluster-based approach and certification support.",
    states: ["All India"],
    link: "https://pgsindia-ncof.gov.in/"
  },
  {
    id: "nbhm",
    title: "National Beekeeping & Honey Mission (NBHM)",
    category: "equipment",
    description: "Aims for the overall promotion and development of scientific beekeeping in the country (Sweet Revolution).",
    states: ["All India"],
    link: "https://nbb.gov.in/"
  },
  {
    id: "nmsa",
    title: "National Mission for Sustainable Agriculture (NMSA)",
    category: "equipment",
    description: "Focuses on climate change adaptation, organic farming, and soil health management.",
    states: ["All India"],
    link: "https://nmsa.dac.gov.in/"
  },
  {
    id: "rad",
    title: "Rainfed Area Development (RAD)",
    category: "equipment",
    description: "Component of NMSA promoting integrated farming systems in rainfed areas for better productivity.",
    states: ["All India"],
    link: "https://nmsa.dac.gov.in/RAD_Overview.aspx"
  },
  {
    id: "bamboo-mission",
    title: "National Bamboo Mission",
    category: "equipment",
    description: "Focuses on development of bamboo sector as a means of generating income and promoting bamboo based industries.",
    states: ["All India"],
    link: "https://nbm.nic.in/"
  },
  // --- STATE SPECIFIC HIGHLIGHTS ---
  {
    id: "karnataka-krishi-bhagya",
    title: "Krishi Bhagya (Karnataka)",
    category: "equipment",
    description: "Subsidies for farm ponds, polyhouses, and micro-irrigation to improve dryland farming.",
    states: ["Karnataka"],
    link: "https://raitamitra.karnataka.gov.in/"
  },
  {
    id: "rythu-bandhu",
    title: "Rythu Bandhu (Telangana)",
    category: "financial",
    description: "Investment support scheme to take care of the initial investment needs of every farmer.",
    states: ["Andhra Pradesh", "Telangana"],
    link: "https://rythubandhu.telangana.gov.in/"
  },
  {
    id: "kal-ia",
    title: "KALIA Scheme (Odisha)",
    category: "financial",
    description: "Krushak Assistance for Livelihood and Income Augmentation for small farmers and landless laborers.",
    states: ["Odisha"],
    link: "https://kalia.odisha.gov.in/"
  },
  {
    id: "maha-solar-pump",
    title: "Mukhya Mantri Saur Krushi Pump Yojana",
    category: "equipment",
    description: "Distribution of solar pumps to farmers in Maharashtra with up to 95% subsidy.",
    states: ["Maharashtra"],
    link: "https://www.mseadl.in/solar-pump-yojana/"
  }
];
const $$splitComponentImporter$b = () => import("./schemes-BTwB6ZcO.js");
const Route$c = createFileRoute("/schemes")({
  validateSearch: (search) => ({
    location: search.location || "All India"
  }),
  loader: async () => {
    return INDIAN_SCHEMES;
  },
  head: () => ({
    meta: [{
      title: "Government Schemes — Farmassist AI"
    }, {
      name: "description",
      content: "Explore government subsidies, financial aid, and insurance for farmers."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./results-AQVJHiyI.js");
const Route$b = createFileRoute("/results")({
  validateSearch: (search) => ({
    location: search.location || "Unknown"
  }),
  head: () => ({
    meta: [{
      title: "Diagnosis Results — Farmassist AI"
    }, {
      name: "description",
      content: "View your crop diagnosis, severity and treatment recommendations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./profile-B2ejRUpz.js");
const Route$a = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Profile — Farmassist AI"
    }, {
      name: "description",
      content: "Your account, plan and language settings."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./pricing-D6JUws_9.js");
const Route$9 = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Pricing — Farmassist AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./mandi-CAbTc_0D.js");
const Route$8 = createFileRoute("/mandi")({
  head: () => ({
    meta: [{
      title: "Mandi Market Prices — Farmassist AI"
    }, {
      name: "description",
      content: "Live market prices from mandis across India, sorted by closeness to you."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-BAuWeEPI.js");
const Route$7 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign In — Farmassist AI"
    }, {
      name: "description",
      content: "Sign in to access your crop history and saved treatments."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./library-BfFt_Isd.js");
const Route$6 = createFileRoute("/library")({
  head: () => ({
    meta: [{
      title: "Crop Disease Library — Farmassist AI"
    }, {
      name: "description",
      content: "Browse common crop diseases, symptoms and treatments."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./history-BsZbwFZR.js");
const Route$5 = createFileRoute("/history")({
  head: () => ({
    meta: [{
      title: "Scan History — Farmassist AI"
    }, {
      name: "description",
      content: "Review your past crop scans and diagnoses."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./heatmap-CzDA_vIW.js");
const Route$4 = createFileRoute("/heatmap")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./faq-0ioSx_Ai.js");
const Route$3 = createFileRoute("/faq")({
  head: () => ({
    meta: [{
      title: "FAQ — Farmassist AI"
    }, {
      name: "description",
      content: "Frequently asked questions about Farmassist AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./analyze-BBodJym_.js");
const Route$2 = createFileRoute("/analyze")({
  head: () => ({
    meta: [{
      title: "Analyze Crop — Farmassist AI"
    }, {
      name: "description",
      content: "Upload or capture a crop image and let AI diagnose disease in seconds."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./about-C-QsptRe.js");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Farmassist AI"
    }, {
      name: "description",
      content: "Empowering farmers with accessible AI-powered crop diagnosis."
    }, {
      property: "og:title",
      content: "About Farmassist AI"
    }, {
      property: "og:description",
      content: "Our mission to help farmers reduce crop loss."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const heroImg = "/assets/hero-crop-CsPQbzms.jpg";
const STATE_DISTRICTS = {
  "Andhra Pradesh": ["Guntur", "Vijayawada", "Kurnool", "Anantapur", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Purnia", "Bhagalpur", "Muzaffarpur", "Gaya", "Arrah", "Begusarai", "Katihar", "Munger", "Samastipur"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur"],
  "Goa": ["Panaji", "Margao", "Mapusa", "Ponda"],
  "Gujarat": ["Mehsana", "Rajkot", "Ahmedabad", "Surat", "Bhavnagar", "Jamnagar", "Junagadh", "Amreli", "Banaskantha", "Patan"],
  "Haryana": ["Hisar", "Karnal", "Ambala", "Rohtak", "Panipat", "Gurugram"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Dharamshala", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bangalore", "Kolar", "Mysuru", "Hubli", "Shimoga", "Tumkur", "Mandya", "Belgaum", "Dharwad", "Hassan"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Neemuch", "Mandsaur", "Ujjain", "Ratlam", "Dewas", "Sagar", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Nashik", "Pune", "Nagpur", "Latur", "Satara", "Ahmednagar", "Jalgaon", "Solapur", "Amravati", "Aurangabad"],
  "Manipur": ["Imphal", "Thoubal", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Moga", "Ferozepur", "Khanna", "Abohar", "Sirsa"],
  "Rajasthan": ["Jaipur", "Kota", "Alwar", "Jodhpur", "Bikaner", "Udaipur", "Sriganganagar", "Hanumangarh", "Tonk", "Bharatpur"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Tirupur", "Erode", "Vellore", "Thanjavur", "Dindigul"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa"],
  "Uttar Pradesh": ["Agra", "Lucknow", "Kanpur", "Varanasi", "Bareilly", "Meerut", "Aligarh", "Jhansi", "Gorakhpur", "Saharanpur"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Rudrapur"],
  "West Bengal": ["Kolkata", "Burdwan", "Howrah", "Hooghly", "Midnapore", "Murshidabad", "Nadia", "Malda", "Siliguri", "Darjeeling"],
  "Delhi": ["New Delhi", "Azadpur", "Okhla", "Narela"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Lakshadweep": ["Kavaratti"]
};
const generateMandis = () => {
  const STATE_MANDI_TYPES = {
    "Karnataka": ["Krishi Utpanna Marukatte Samithi", "Sahakari Marukatte", "Hannu mattu Tarakari Market", "APMC Regional Hub"],
    "Maharashtra": ["Krishi Utpanna Bazar Samiti (KUBS)", "Shetkari Bazar", "Bhaji Mandai", "APMC Yard"],
    "Punjab": ["Dana Mandi", "Anaaj Mandi", "Kheti Bhawan Hub", "Grain Market"],
    "Tamil Nadu": ["Uzhavar Sandhai", "Regulated Market Committee", "Velaan Marukatti", "APMC Hub"],
    "Uttar Pradesh": ["Krishi Upaj Mandi Samiti (KUMS)", "Sabzi Mandi", "Anaaj Mandi", "Galla Mandi"],
    "Madhya Pradesh": ["Krishi Upaj Mandi", "Anaaj Mandi", "Sabzi Mandi", "Regional APMC"],
    "Bihar": ["Krishi Bazar", "Sabzi Mandi", "Anaaj Mandi", "Bazar Samiti"],
    "West Bengal": ["Krishi Bazar Samiti", "Sabji Mandi", "Anaj Mandi", "Regulated Market"],
    "Rajasthan": ["Krishi Upaj Mandi", "Anaaj Mandi", "Sabzi Mandi", "Regional Hub"],
    "Gujarat": ["Khetiwadi Utpanna Bazar Samiti", "Shaak Bhaaji Mandi", "APMC Yard", "Grain Market"]
  };
  const crops = ["Wheat", "Rice", "Onion", "Tomato", "Potato", "Maize", "Soybean", "Cotton", "Chilli", "Turmeric", "Garlic", "Ginger", "Lemon", "Mango", "Apple", "Grapes", "Pomegranate", "Banana", "Ragi", "Jowar", "Bajra", "Mustard", "Arhar Dal", "Moong Dal", "Urad Dal", "Gram"];
  const DISTRICT_COORDS = {
    // ... (rest of the coords remain the same)
    // Karnataka (APMC Locations)
    "Bangalore": { lat: 13.0292, lon: 77.5552 },
    "Kolar": { lat: 13.1368, lon: 78.1292 },
    "Mysuru": { lat: 12.3364, lon: 76.6273 },
    "Hubli": { lat: 15.3418, lon: 75.1485 },
    "Shimoga": { lat: 13.931, lon: 75.562 },
    "Tumkur": { lat: 13.342, lon: 77.101 },
    "Mandya": { lat: 12.525, lon: 76.892 },
    "Belgaum": { lat: 15.862, lon: 74.505 },
    "Dharwad": { lat: 15.451, lon: 75.011 },
    "Hassan": { lat: 13.004, lon: 76.108 },
    // Maharashtra
    "Nashik": { lat: 20.005, lon: 73.785 },
    "Pune": { lat: 18.495, lon: 73.868 },
    "Nagpur": { lat: 21.151, lon: 79.112 },
    "Latur": { lat: 18.401, lon: 76.581 },
    "Satara": { lat: 17.691, lon: 74.002 },
    "Ahmednagar": { lat: 19.102, lon: 74.731 },
    "Jalgaon": { lat: 21.012, lon: 75.568 },
    "Solapur": { lat: 17.662, lon: 75.918 },
    "Amravati": { lat: 20.938, lon: 77.761 },
    "Aurangabad": { lat: 19.882, lon: 75.348 },
    // UP
    "Agra": { lat: 27.201, lon: 78.012 },
    "Lucknow": { lat: 26.852, lon: 81.012 },
    "Kanpur": { lat: 26.461, lon: 80.312 },
    "Varanasi": { lat: 25.321, lon: 82.981 },
    "Bareilly": { lat: 28.371, lon: 79.442 },
    "Meerut": { lat: 28.992, lon: 77.712 },
    "Aligarh": { lat: 27.901, lon: 78.102 },
    "Jhansi": { lat: 25.452, lon: 78.581 },
    "Gorakhpur": { lat: 26.771, lon: 83.382 },
    "Saharanpur": { lat: 29.972, lon: 77.551 },
    // Punjab
    "Ludhiana": { lat: 30.912, lon: 75.842 },
    "Amritsar": { lat: 31.642, lon: 74.881 },
    "Jalandhar": { lat: 31.332, lon: 75.582 },
    "Patiala": { lat: 30.342, lon: 76.392 },
    "Bathinda": { lat: 30.222, lon: 74.952 },
    "Moga": { lat: 30.822, lon: 75.182 },
    "Ferozepur": { lat: 30.932, lon: 74.612 },
    "Khanna": { lat: 30.712, lon: 76.222 },
    "Abohar": { lat: 30.132, lon: 74.202 },
    "Sirsa": { lat: 29.542, lon: 75.022 },
    // Gujarat
    "Mehsana": { lat: 23.592, lon: 72.372 },
    "Rajkot": { lat: 22.312, lon: 70.812 },
    "Ahmedabad": { lat: 23.032, lon: 72.582 },
    "Surat": { lat: 21.182, lon: 72.842 },
    "Bhavnagar": { lat: 21.772, lon: 72.162 },
    "Jamnagar": { lat: 22.482, lon: 70.062 },
    "Junagadh": { lat: 21.532, lon: 70.462 },
    "Amreli": { lat: 21.612, lon: 71.222 },
    "Banaskantha": { lat: 24.272, lon: 71.752 },
    "Patan": { lat: 23.852, lon: 72.132 },
    // Rajasthan
    "Jaipur": { lat: 26.922, lon: 75.792 },
    "Kota": { lat: 25.222, lon: 75.872 },
    "Alwar": { lat: 27.562, lon: 76.642 },
    "Jodhpur": { lat: 26.242, lon: 73.032 },
    "Bikaner": { lat: 28.032, lon: 73.322 },
    "Udaipur": { lat: 24.592, lon: 73.722 },
    "Sriganganagar": { lat: 29.912, lon: 73.882 },
    "Hanumangarh": { lat: 29.592, lon: 74.332 },
    "Tonk": { lat: 26.172, lon: 75.802 },
    "Bharatpur": { lat: 27.222, lon: 77.512 },
    // MP
    "Indore": { lat: 22.722, lon: 75.862 },
    "Bhopal": { lat: 23.262, lon: 77.422 },
    "Neemuch": { lat: 24.482, lon: 74.882 },
    "Mandsaur": { lat: 24.042, lon: 75.072 },
    "Ujjain": { lat: 23.182, lon: 75.792 },
    "Ratlam": { lat: 23.342, lon: 75.042 },
    "Dewas": { lat: 22.972, lon: 76.062 },
    "Sagar": { lat: 23.842, lon: 78.742 },
    "Gwalior": { lat: 26.222, lon: 78.182 },
    "Jabalpur": { lat: 23.192, lon: 79.992 },
    // Bihar
    "Patna": { lat: 25.602, lon: 85.142 },
    "Purnia": { lat: 25.782, lon: 87.482 },
    "Bhagalpur": { lat: 25.252, lon: 86.982 },
    "Muzaffarpur": { lat: 26.132, lon: 85.372 },
    "Gaya": { lat: 24.802, lon: 85.012 },
    "Arrah": { lat: 25.562, lon: 84.672 },
    "Begusarai": { lat: 25.422, lon: 86.132 },
    "Katihar": { lat: 25.562, lon: 87.582 },
    "Munger": { lat: 25.382, lon: 86.482 },
    "Samastipur": { lat: 25.872, lon: 85.792 },
    // West Bengal
    "Kolkata": { lat: 22.582, lon: 88.372 },
    "Burdwan": { lat: 23.242, lon: 87.872 },
    "Howrah": { lat: 22.602, lon: 88.272 },
    "Hooghly": { lat: 22.912, lon: 88.392 },
    "Midnapore": { lat: 22.432, lon: 87.322 },
    "Murshidabad": { lat: 24.182, lon: 88.252 },
    "Nadia": { lat: 23.482, lon: 88.562 },
    "Malda": { lat: 25.022, lon: 88.152 },
    "Siliguri": { lat: 26.732, lon: 88.402 },
    "Darjeeling": { lat: 27.052, lon: 88.272 },
    // Tamil Nadu
    "Chennai": { lat: 13.092, lon: 80.282 },
    "Coimbatore": { lat: 11.022, lon: 76.962 },
    "Madurai": { lat: 9.932, lon: 78.122 },
    "Salem": { lat: 11.672, lon: 78.152 },
    "Trichy": { lat: 10.802, lon: 78.712 },
    "Tirupur": { lat: 11.112, lon: 77.352 },
    "Erode": { lat: 11.352, lon: 77.722 },
    "Vellore": { lat: 12.922, lon: 79.142 },
    "Thanjavur": { lat: 10.792, lon: 79.142 },
    "Dindigul": { lat: 10.372, lon: 77.992 }
  };
  const mandis = [];
  let idCounter = 1;
  Object.entries(STATE_DISTRICTS).forEach(([stateName, districts]) => {
    const mandiPrefixes = STATE_MANDI_TYPES[stateName] || ["Agricultural Produce Market", "Regional Mandi", "APMC Market"];
    districts.forEach((district) => {
      const baseCoords = DISTRICT_COORDS[district] || { lat: 20 + Math.random() * 10, lon: 75 + Math.random() * 10 };
      const mandiCount = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < mandiCount; i++) {
        const type = mandiPrefixes[i % mandiPrefixes.length];
        const mandiName = i === 0 ? `${district} ${type}` : `${district} Sector ${i + 1} ${type}`;
        const lat = baseCoords.lat + (Math.random() - 0.5) * 0.15;
        const lon = baseCoords.lon + (Math.random() - 0.5) * 0.15;
        const mandiCommodities = crops.sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 5)).map((crop) => ({
          name: crop,
          price: 1500 + Math.floor(Math.random() * 6e3),
          unit: "Quintal",
          trend: Math.random() > 0.5 ? "up" : "down"
        }));
        mandis.push({
          id: `mandi-${idCounter++}`,
          name: mandiName,
          state: stateName,
          district,
          lat,
          lon,
          commodities: mandiCommodities
        });
      }
    });
  });
  return mandis;
};
const ALL_MANDIS = generateMandis();
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmassist AI — Check crop health in seconds" },
      { name: "description", content: "Upload a photo of your crop and let AI diagnose disease in seconds." },
      { property: "og:title", content: "Farmassist AI — Check crop health in seconds" },
      { property: "og:description", content: "Upload a photo and get instant AI-powered diagnosis." }
    ]
  }),
  component: HomePage
});
const weatherRecommendations = {
  Karnataka: { temp: 32, humidity: 68, condition: "Partly Cloudy", icon: "sun", tips: [{ crop: "Ragi", advice: "Humidity at 68% — ideal time to apply fungicide spray.", risk: "medium" }, { crop: "Tomato", advice: "High moisture risk. Watch for Early Blight.", risk: "high" }] },
  Maharashtra: { temp: 34, humidity: 45, condition: "Sunny", icon: "sun", tips: [{ crop: "Cotton", advice: "Low humidity. Soil is drying fast, schedule evening irrigation.", risk: "low" }, { crop: "Onion", advice: "Monitor for Thrips activity due to dry heat.", risk: "medium" }] },
  Punjab: { temp: 28, humidity: 55, condition: "Overcast", icon: "rain", tips: [{ crop: "Wheat", advice: "Rain expected. Postpone harvesting to avoid spoilage.", risk: "high" }, { crop: "Mustard", advice: "Check for aphid infestation after rain.", risk: "medium" }] },
  "Uttar Pradesh": { temp: 30, humidity: 60, condition: "Humid", icon: "sun", tips: [{ crop: "Sugarcane", advice: "Ideal for growth. Add urea top dressing before next rain.", risk: "low" }, { crop: "Potato", advice: "Mist alert — high risk of Late Blight.", risk: "high" }] },
  "Tamil Nadu": { temp: 31, humidity: 75, condition: "Coastal Rain", icon: "rain", tips: [{ crop: "Paddy", advice: "Drain excess water from nurseries to prevent root rot.", risk: "high" }, { crop: "Coconut", advice: "Apply organic mulch to retain moisture.", risk: "low" }] },
  "West Bengal": { temp: 29, humidity: 82, condition: "Stormy", icon: "rain", tips: [{ crop: "Jute", advice: "Strong winds. Check for stem breakage.", risk: "medium" }, { crop: "Rice", advice: "High humidity — risk of Blast disease.", risk: "high" }] },
  "Rajasthan": { temp: 42, humidity: 15, condition: "Heatwave", icon: "alert", tips: [{ crop: "Bajra", advice: "Extreme heat. Provide light irrigation.", risk: "high" }, { crop: "Guar", advice: "Drought tolerant, but watch for leaf scorching.", risk: "low" }] },
  "Kerala": { temp: 28, humidity: 90, condition: "Monsoon", icon: "rain", tips: [{ crop: "Rubber", advice: "Heavy rain. Ensure rain guards are intact.", risk: "high" }, { crop: "Black Pepper", advice: "Risk of Quick Wilt.", risk: "medium" }] },
  "Assam": { temp: 27, humidity: 85, condition: "Heavy Rain", icon: "rain", tips: [{ crop: "Tea", advice: "Rain stimulates flush. Watch for Red Spider Mites.", risk: "low" }, { crop: "Pineapple", advice: "Ensure pits are well-drained.", risk: "medium" }] }
};
const DEFAULT_RECOMMENDATION = {
  temp: 28,
  humidity: 50,
  condition: "Stable"
};
const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep"
].sort();
const faqs = [
  { q: "How do I scan my crop for diseases?", a: "Simply navigate to the 'Analyze' tab and upload a clear photo of the infected plant leaf. Our AI will analyze and provide a diagnosis, severity report, and treatment plan in seconds." },
  { q: "What are your pricing plans?", a: "We offer a Daily Pass for ₹99 and a Monthly Pro subscription for ₹999 for ongoing seasonal monitoring with priority AI processing." },
  { q: "How many crop diseases can the AI detect?", a: "Our AI is trained to identify 150+ major crop diseases. Browse the full list in our Disease Library." },
  { q: "Are my crop photos stored securely?", a: "Yes. Images are processed securely and are never shared or sold to third parties." },
  { q: "How accurate is the disease detection?", a: "Our models are trained on hundreds of thousands of crop images. For widespread infections, we recommend verifying with a local agronomist." },
  { q: "Can I view my past crop scans?", a: "Yes! All previous scans and diagnoses are saved in your History tab for seasonal tracking." },
  { q: "What if the AI can't identify the disease?", a: "Ensure your photo is well-lit and in focus. The specific disease may not yet be in our database — we update it constantly." }
];
const TIP_POOL = {
  "South": [
    { crop: "Paddy", advice: "BPH (Brown Planthopper) alert in early-sown crops. Use neem-based sprays.", risk: "high", cat: "PEST" },
    { crop: "Coconut", advice: "Ideal time for root feeding with micronutrients for better nut size.", risk: "low", cat: "SOIL" },
    { crop: "Ragi", advice: "Expected afternoon drizzle. Delay pesticide spray by 24 hours.", risk: "medium", cat: "WATER" },
    { crop: "Turmeric", advice: "Market prices for dried rhizomes trending up in Erode. Hold harvest.", risk: "low", cat: "MARKET" }
  ],
  "North": [
    { crop: "Wheat", advice: "Stem rust alert due to rising morning mist. Inspect lower leaves.", risk: "high", cat: "PEST" },
    { crop: "Mustard", advice: "Aphid population threshold reached. Apply recommended bio-insecticide.", risk: "medium", cat: "PEST" },
    { crop: "Potato", advice: "Late blight risk 90%. Preventive copper spray is mandatory today.", risk: "high", cat: "PEST" },
    { crop: "Sugarcane", advice: "Top-dress with Nitrogen before the predicted light showers.", risk: "low", cat: "SOIL" }
  ],
  "West": [
    { crop: "Cotton", advice: "Pink bollworm warning in rain-fed areas. Set up pheromone traps.", risk: "high", cat: "PEST" },
    { crop: "Onion", advice: "Prices expected to peak in 15 days. Ensure proper curing for storage.", risk: "low", cat: "MARKET" },
    { crop: "Grapes", advice: "High UV index today. Ensure canopy management to avoid berry scorch.", risk: "medium", cat: "WATER" },
    { crop: "Groundnut", advice: "Calcium deficiency spotted in regional soil tests. Apply gypsum.", risk: "medium", cat: "SOIL" }
  ],
  "East": [
    { crop: "Jute", advice: "Ideal water level for retting. Start harvest for optimal fiber quality.", risk: "low", cat: "WATER" },
    { crop: "Maize", advice: "Fall Armyworm alert. Check central whorls of 30-45 day old plants.", risk: "high", cat: "PEST" },
    { crop: "Tea", advice: "Blister blight risk high due to heavy overcast. Improve drainage.", risk: "medium", cat: "PEST" },
    { crop: "Pineapple", advice: "Prices stable. Good window for local bulk supply contracts.", risk: "low", cat: "MARKET" }
  ]
};
const STATE_HUB_COORDS = {
  "Andhra Pradesh": { lat: 16.5062, lon: 80.648 },
  "Arunachal Pradesh": { lat: 27.0844, lon: 93.6053 },
  "Assam": { lat: 26.1445, lon: 91.7362 },
  "Bihar": { lat: 25.5941, lon: 85.1376 },
  "Chhattisgarh": { lat: 21.2514, lon: 81.6296 },
  "Goa": { lat: 15.4909, lon: 73.8278 },
  "Gujarat": { lat: 23.2156, lon: 72.6369 },
  "Haryana": { lat: 30.7333, lon: 76.7794 },
  "Himachal Pradesh": { lat: 31.1048, lon: 77.1734 },
  "Jharkhand": { lat: 23.3441, lon: 85.3096 },
  "Karnataka": { lat: 12.9716, lon: 77.5946 },
  "Kerala": { lat: 8.5241, lon: 76.9366 },
  "Madhya Pradesh": { lat: 23.2599, lon: 77.4126 },
  "Maharashtra": { lat: 18.5204, lon: 73.8567 },
  "Manipur": { lat: 24.817, lon: 93.9368 },
  "Meghalaya": { lat: 25.5788, lon: 91.8933 },
  "Mizoram": { lat: 23.7271, lon: 92.7176 },
  "Nagaland": { lat: 25.6751, lon: 94.1086 },
  "Odisha": { lat: 20.2961, lon: 85.8245 },
  "Punjab": { lat: 30.7333, lon: 76.7794 },
  "Rajasthan": { lat: 26.9124, lon: 75.7873 },
  "Sikkim": { lat: 27.3314, lon: 88.6138 },
  "Tamil Nadu": { lat: 13.0827, lon: 80.2707 },
  "Telangana": { lat: 17.385, lon: 78.4867 },
  "Tripura": { lat: 23.8315, lon: 91.2868 },
  "Uttar Pradesh": { lat: 26.8467, lon: 80.9462 },
  "Uttarakhand": { lat: 30.3165, lon: 78.0322 },
  "West Bengal": { lat: 22.5726, lon: 88.3639 },
  "Delhi": { lat: 28.6139, lon: 77.209 },
  "Jammu and Kashmir": { lat: 34.0837, lon: 74.7973 },
  "Ladakh": { lat: 34.1526, lon: 77.5771 },
  "Puducherry": { lat: 11.9416, lon: 79.8083 },
  "Andaman and Nicobar Islands": { lat: 11.6234, lon: 92.7265 },
  "Chandigarh": { lat: 30.7333, lon: 76.7794 },
  "Dadra and Nagar Haveli and Daman and Diu": { lat: 20.4283, lon: 72.8397 },
  "Lakshadweep": { lat: 10.5667, lon: 72.6417 }
};
const getRegion = (state) => {
  const south = ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana", "Puducherry", "Lakshadweep"];
  const north = ["Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh", "Jammu and Kashmir", "Ladakh", "Delhi", "Uttarakhand", "Chandigarh"];
  const west = ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "Dadra and Nagar Haveli and Daman and Diu"];
  if (south.includes(state)) return "South";
  if (north.includes(state)) return "North";
  if (west.includes(state)) return "West";
  return "East";
};
function WeatherReco({ state }) {
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    setFormattedDate((/* @__PURE__ */ new Date()).toLocaleDateString());
  }, []);
  const data = weatherRecommendations[state] || DEFAULT_RECOMMENDATION;
  const region = getRegion(state);
  const dynamicTips = TIP_POOL[region] || TIP_POOL["South"];
  const riskColors = { low: "text-success bg-success/10", medium: "text-warning bg-warning/10", high: "text-destructive bg-destructive/10" };
  const catColors = { SOIL: "bg-amber-100 text-amber-700", PEST: "bg-rose-100 text-rose-700", WATER: "bg-blue-100 text-blue-700", MARKET: "bg-emerald-100 text-emerald-700" };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-primary/10 bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
          " AI Dynamic Advisor"
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "mt-2 font-display text-xl font-bold", children: [
          "Live Intelligence for ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: state })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "Rotational insights updated for ",
          formattedDate || "..."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 font-semibold", children: [
          /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 text-warning" }),
          data.temp,
          "°C"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 font-semibold", children: [
          /* @__PURE__ */ jsx(Droplets, { className: "h-4 w-4 text-blue-500" }),
          data.humidity,
          "%"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-muted-foreground font-medium", children: [
          /* @__PURE__ */ jsx(Wind, { className: "h-4 w-4" }),
          data.condition
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: dynamicTips.map((tip, idx) => /* @__PURE__ */ jsxs("div", { className: "group flex flex-col rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-card hover:shadow-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: `rounded-md px-2 py-0.5 text-[9px] font-black tracking-wider ${catColors[tip.cat]}`, children: tip.cat }),
        /* @__PURE__ */ jsxs("span", { className: `flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${riskColors[tip.risk]}`, children: [
          tip.risk,
          " risk"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "font-display font-bold text-base group-hover:text-primary transition-colors", children: tip.crop }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3", children: tip.advice })
    ] }, idx)) })
  ] });
}
function FAQSection() {
  const [open, setOpen] = useState(0);
  return /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-3xl px-4 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold sm:text-4xl", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: "Quick answers about how Farmassist AI works." })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "mt-10 space-y-3", children: faqs.map((item, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxs("li", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpen(isOpen ? null : i),
            className: "flex w-full items-center justify-between gap-3 px-5 py-4 text-left",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-display text-sm font-semibold sm:text-base", children: item.q }),
              /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 flex-none text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "px-5 pb-5 text-sm text-muted-foreground", children: item.a }) }) })
      ] }, i);
    }) })
  ] });
}
function AboutSection() {
  return /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-6xl px-4 py-20 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2 items-center", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary", children: [
        /* @__PURE__ */ jsx(Leaf, { className: "h-3.5 w-3.5" }),
        " Our Mission"
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-6 font-display text-3xl font-extrabold sm:text-4xl leading-tight", children: [
        "Empowering farmers with ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "AI-Powered Intelligence" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-base text-muted-foreground leading-relaxed max-w-lg", children: "Every year, billions of dollars in crops are lost to diseases caught too late. Farmassist AI puts a plant pathologist in every farmer's pocket, reducing crop loss and increasing global food security." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 p-6 rounded-3xl bg-muted/30 border border-border", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-lg", children: "Our Story" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground italic", children: "Born from a vision to make smart agriculture accessible — not just for big farms, but for every farmer with a phone." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-3xl border border-border bg-card shadow-soft hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-6", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold", children: "The Problem" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "Smallholder farmers lack timely access to agronomy experts. By the time a disease is identified, half the harvest may already be lost." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-3xl border border-border bg-card shadow-soft hover:shadow-xl transition-all duration-300", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6", children: /* @__PURE__ */ jsx(Zap, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold", children: "Our Solution" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "A computer vision model trained on thousands of crop images detects disease, severity and recommends treatment instantly from a photo." })
      ] })
    ] })
  ] }) });
}
function LocationControl() {
  const { city, state, setLocation } = useLocation();
  const [isLocating, setIsLocating] = useState(false);
  const [status, setStatus] = useState(null);
  const baseDistricts = STATE_DISTRICTS[state] || [];
  const districts = city && !baseDistricts.includes(city) ? [city, ...baseDistricts] : baseDistricts;
  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }
    setIsLocating(true);
    setStatus("Detecting...");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
          headers: { "User-Agent": "FarmScanAI/1.0" }
        });
        const data = await res.json();
        const addr = data.address || {};
        const stateField = addr.state || addr.state_district || addr.region || "";
        const matchedState = STATES.find(
          (s) => stateField.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(stateField.toLowerCase())
        ) || state;
        let rawCity = addr.state_district || addr.city_district || addr.town || addr.city || addr.village || addr.suburb || "";
        const cleanCity = rawCity.replace(/\sDistrict$/i, "").replace(/\sTehsil$/i, "").replace(/\sTaluk$/i, "").replace(/\sMandal$/i, "").trim();
        const hubMatch = baseDistricts.find(
          (d) => cleanCity.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(cleanCity.toLowerCase())
        );
        const finalCity = hubMatch || cleanCity;
        setLocation(finalCity, matchedState, lat, lon);
        setStatus(finalCity ? `Found: ${finalCity}` : `Found: ${matchedState}`);
        setTimeout(() => setStatus(null), 3e3);
      } catch (e) {
        setStatus("Detection error");
      } finally {
        setIsLocating(false);
      }
    }, (err) => {
      setStatus(err.code === 1 ? "Permission Denied" : "GPS Error");
      setIsLocating(false);
    }, { timeout: 8e3, enableHighAccuracy: true });
  };
  return /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-6xl px-4 -mt-12 relative z-20", children: /* @__PURE__ */ jsx("div", { className: "rounded-[32px] border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold", children: "Current Region" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: city ? `${city}, ${state}` : `Whole State of ${state}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-all hover:border-primary/30", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium", children: "State:" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: state,
            onChange: (e) => {
              const hub = STATE_HUB_COORDS[e.target.value] || { lat: 12.97, lon: 77.59 };
              setLocation("", e.target.value, hub.lat, hub.lon);
            },
            className: "bg-transparent outline-none font-bold cursor-pointer",
            children: STATES.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-2 text-sm shadow-sm transition-all hover:border-primary/30", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium", children: "City:" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: city,
            onChange: (e) => {
              const hub = STATE_HUB_COORDS[state] || { lat: 12.97, lon: 77.59 };
              setLocation(e.target.value, state, hub.lat, hub.lon);
            },
            className: "bg-transparent outline-none font-bold cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Whole State (All Cities)" }),
              districts.map((d) => /* @__PURE__ */ jsx("option", { value: d, children: d }, d))
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleAutoDetect,
            disabled: isLocating,
            className: "flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg hover:scale-105 transition-all disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(Navigation, { className: `h-4 w-4 ${isLocating ? "animate-spin" : ""}` }),
              isLocating ? "Locating..." : "Auto-Detect"
            ]
          }
        ),
        status && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary animate-pulse", children: status }),
          status.includes("Denied") && /* @__PURE__ */ jsx("span", { className: "text-[9px] text-muted-foreground mt-1 text-center max-w-[120px]", children: "Click the lock icon in your browser bar to reset location permissions." })
        ] })
      ] })
    ] })
  ] }) }) });
}
function HomePage() {
  const { city, state, lat, lon, setLocation } = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-hero-gradient border-b border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-[20%] -left-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-primary/10 blur-[100px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] -right-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-primary-soft/20 blur-[100px]", style: { animationDelay: "2s" } }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-bold text-primary", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Next-Gen AI Vision Enabled"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-5xl font-extrabold leading-tight text-foreground sm:text-6xl md:text-7xl", children: [
            "Check Crop ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-primary-soft bg-clip-text text-transparent", children: "Health Instantly." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md text-base text-muted-foreground sm:text-xl leading-relaxed", children: "The world's most accessible plant pathologist. Diagnosis, severity, and treatment in under 5 seconds." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/analyze", className: "inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-card transition-all hover:scale-[1.05] hover:shadow-xl", children: [
              /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6" }),
              " Analyze Your Crop"
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/library", className: "inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 text-base font-bold text-foreground hover:bg-accent transition-all", children: [
              "Disease Library ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
              " Secure"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-primary" }),
              " Real-time"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative animate-in fade-in zoom-in duration-1000", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 rounded-[40px] bg-primary/20 blur-3xl transition-all duration-500 hover:bg-primary/30" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: heroImg,
              alt: "Healthy crop field",
              width: 1536,
              height: 1024,
              className: "relative aspect-[4/3] w-full rounded-[40px] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-8 left-8 right-8 rounded-3xl border border-border/50 bg-card/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 sm:left-auto sm:right-8 sm:w-72", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary", children: /* @__PURE__ */ jsx(Leaf, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest", children: "Diagnosis Status" }),
              /* @__PURE__ */ jsx("p", { className: "font-display text-lg font-bold", children: "Healthy Field · 98%" })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(LocationControl, {}),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-4 py-20 border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-extrabold sm:text-4xl", children: "Regional Crop Advisory" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground mt-2", children: "AI-powered weather insights and field tips for your area" })
      ] }),
      /* @__PURE__ */ jsx(WeatherReco, { state })
    ] }),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-4 py-20 border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl font-extrabold sm:text-5xl", children: "How it works" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto", children: "Three simple steps to secure your harvest. No jargon. No waiting." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 grid gap-8 md:grid-cols-3", children: [
        { n: "01", tText: "Upload Image", d: "Snap or upload a clear photo of the affected leaf or crop.", Icon: Camera },
        { n: "02", tText: "AI Analysis", d: "Our model inspects the image and identifies the issue.", Icon: Sparkles },
        { n: "03", tText: "Get Treatment", d: "Receive severity, prevention and treatment guidance instantly.", Icon: Leaf }
      ].map(({ n, tText, d, Icon }) => /* @__PURE__ */ jsxs("div", { className: "group relative rounded-[32px] border border-border bg-card p-10 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[32px] bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-display text-5xl font-black text-primary/5 group-hover:text-primary/10 transition-colors", children: n })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-8 font-display text-2xl font-bold", children: tText }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base text-muted-foreground leading-relaxed", children: d })
      ] }, n)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-6xl px-4 py-20", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[40px] bg-primary p-10 md:p-20 text-center text-primary-foreground shadow-2xl", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-hero-gradient opacity-20 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl font-black sm:text-5xl", children: "Ready to secure your harvest?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-primary-foreground/80 font-medium", children: "Join thousands of farmers using AI to protect their crops. Your first 20 scans every day are on us." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap justify-center gap-4", children: /* @__PURE__ */ jsxs(Link, { to: "/analyze", className: "inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-primary shadow-xl hover:scale-[1.05] transition-all", children: [
          "Analyze Crop Now ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsx(FAQSection, {}) })
  ] });
}
const SdgRoute = Route$d.update({
  id: "/sdg",
  path: "/sdg",
  getParentRoute: () => Route$e
});
const SchemesRoute = Route$c.update({
  id: "/schemes",
  path: "/schemes",
  getParentRoute: () => Route$e
});
const ResultsRoute = Route$b.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => Route$e
});
const ProfileRoute = Route$a.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$e
});
const PricingRoute = Route$9.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$e
});
const MandiRoute = Route$8.update({
  id: "/mandi",
  path: "/mandi",
  getParentRoute: () => Route$e
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$e
});
const LibraryRoute = Route$6.update({
  id: "/library",
  path: "/library",
  getParentRoute: () => Route$e
});
const HistoryRoute = Route$5.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => Route$e
});
const HeatmapRoute = Route$4.update({
  id: "/heatmap",
  path: "/heatmap",
  getParentRoute: () => Route$e
});
const FaqRoute = Route$3.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$e
});
const AnalyzeRoute = Route$2.update({
  id: "/analyze",
  path: "/analyze",
  getParentRoute: () => Route$e
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$e
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AnalyzeRoute,
  FaqRoute,
  HeatmapRoute,
  HistoryRoute,
  LibraryRoute,
  LoginRoute,
  MandiRoute,
  PricingRoute,
  ProfileRoute,
  ResultsRoute,
  SchemesRoute,
  SdgRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ALL_MANDIS as A,
  Route$c as R,
  Route$b as a,
  router as r,
  supabase as s,
  useLocation as u
};
