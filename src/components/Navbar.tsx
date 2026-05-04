import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Globe, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/mandi", label: "Markets" },
  { to: "/library", label: "Library" },
  { to: "/schemes", label: "Schemes" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [session, setSession] = useState<any>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const currentLang = i18n.language;
  const displayLang = currentLang === "English" ? "EN" : currentLang === "हिन्दी" ? "हि" : "ಕ";

  const toggleLanguage = () => {
    if (currentLang === "English") i18n.changeLanguage("हिन्दी");
    else if (currentLang === "हिन्दी") i18n.changeLanguage("ಕನ್ನಡ");
    else i18n.changeLanguage("English");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-12 w-12 rounded-lg shadow-sm" />
          <span className="font-display text-2xl font-bold tracking-tight">
            <span className="text-primary">Farm</span>
            <span className="text-foreground">assist</span>
            <span className="ml-1 text-sm font-semibold text-primary-soft">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {t(l.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent sm:flex"
          >
            <Globe className="h-3.5 w-3.5" /> {displayLang}
          </button>
          
          {session ? (
            <Link
              to="/profile"
              className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent md:inline-flex"
            >
              <User className="h-4 w-4" /> {t("Profile")}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent md:inline-flex"
            >
              {t("Sign In")}
            </Link>
          )}

          <Link
            to="/analyze"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] md:inline-flex"
          >
            {t("Try Now")}
          </Link>
        </div>
      </div>
    </header>
  );
}
