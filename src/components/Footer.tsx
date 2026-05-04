import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-16 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10 rounded-md" />
              <span className="font-display text-xl font-bold">Farmassist AI</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {t("Smart advice. Better harvests. AI-powered crop disease detection for every farmer.")}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">{t("Product")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/analyze" className="hover:text-primary">{t("Analyze")}</Link></li>
              <li><Link to="/library" className="hover:text-primary">{t("Disease Library")}</Link></li>
              <li><Link to="/faq" className="hover:text-primary">{t("FAQ")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">{t("Impact")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sdg" className="hover:text-primary">{t("SDG Alignment")}</Link></li>
              <li><Link to="/about" className="hover:text-primary">{t("About us")}</Link></li>
              <li><span className="text-xs">{t("Your images are processed securely and never sold.")}</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Farmassist AI. All rights reserved.</span>
          <span>Made with 🌱 for farmers.</span>
        </div>
      </div>
    </footer>
  );
}
