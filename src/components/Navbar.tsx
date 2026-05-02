import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Globe } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/library", label: "Library" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [lang, setLang] = useState("EN");
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9 rounded-md" />
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-primary">Farm</span>
            <span className="text-foreground">assist</span>
            <span className="ml-1 text-xs font-semibold text-primary-soft">AI</span>
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
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "EN" ? "हि" : lang === "हि" ? "ಕ" : "EN")}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent sm:flex"
          >
            <Globe className="h-3.5 w-3.5" /> {lang}
          </button>
          <Link
            to="/analyze"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] md:inline-flex"
          >
            Try Now
          </Link>
        </div>
      </div>
    </header>
  );
}
