import { Link } from "@tanstack/react-router";
import { Home, Camera, TrendingUp, User, Landmark, Map } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home, exact: true },
  { to: "/analyze", label: "Analyze", Icon: Camera, exact: false },
  { to: "/heatmap", label: "CropWatch", Icon: Map, exact: false },
  { to: "/mandi", label: "Markets", Icon: TrendingUp, exact: false },
  { to: "/schemes", label: "Schemes", Icon: Landmark, exact: false },
  { to: "/profile", label: "Profile", Icon: User, exact: false },
] as const;

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-6">
        {items.map(({ to, label, Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-0.5 px-1 pb-2 pt-2.5 text-[10px] font-medium transition-colors"
            >

              {({ isActive }) => (
                <>
                  <span className={`flex h-9 w-12 items-center justify-center rounded-full transition-colors ${isActive ? "bg-primary/12" : ""}`}>
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  {label}
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
