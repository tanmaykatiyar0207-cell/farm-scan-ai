import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomTabBar } from "@/components/BottomTabBar";
import "@/lib/i18n";
import { AlertTriangle } from "lucide-react";
import { LocationProvider } from "@/lib/location";
import React from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary font-display">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: any }) {
  console.error("Global Error Caught:", error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="font-display text-2xl font-bold">Oops! Something went wrong</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Our servers encountered a temporary issue. Please refresh the page or try again in a moment.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:scale-105 transition-all"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}



export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Farmassist AI — Smart advice. Better harvests." },
      { name: "description", content: "AI-powered crop disease detection. Upload a photo and get instant diagnosis, severity and treatment in seconds." },
      { property: "og:title", content: "Farmassist AI" },
      { property: "og:description", content: "AI-powered crop disease detection for farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}



function RootComponent() {
  return (
    <LocationProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <BottomTabBar />
      </div>
    </LocationProvider>
  );
}
