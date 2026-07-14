"use client";

import * as React from "react";
import { Menu, Search, GraduationCap, IconContext } from "@/lib/icons";
import { useHashRoute, type Route } from "./use-hash-route";
import { Sidebar, MobileSidebar } from "./sidebar";
import { TimerBar } from "./timer-bar";
import { FocusControl } from "./focus-control";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { useStudyStore } from "@/lib/store";
import { SUBJECT_MAP } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { DashboardView } from "./views/dashboard-view";
import { TrackView } from "./views/track-view";
import { AnalyticsView } from "./views/analytics-view";
import { AchievementsView } from "./views/achievements-view";
import { DataView } from "./views/data-view";
import { useIsMobile } from "@/hooks/use-mobile";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  achievements: "Achievements",
  data: "Data & Settings",
};

export function AppShell() {
  const [route, navigate] = useHashRoute();
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const startTimer = useStudyStore((s) => s.startTimer);

  // keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // ⌘K / Ctrl+K — palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (typing) return;

      if (e.key === "?") {
        e.preventDefault();
        toastShortcuts();
      }
      // quick nav
      if (e.key === "g") {
        // wait for second key — simple: g then d/a/c/s
        const handler = (ev: KeyboardEvent) => {
          window.removeEventListener("keydown", handler);
          if (ev.key === "d") navigate({ view: "dashboard" });
          else if (ev.key === "a") navigate({ view: "analytics" });
          else if (ev.key === "c") navigate({ view: "achievements" });
          else if (ev.key === "s") navigate({ view: "data" });
        };
        window.addEventListener("keydown", handler, { once: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const title =
    route.view === "track"
      ? SUBJECT_MAP[route.subjectId]?.name ?? "Track"
      : VIEW_TITLES[route.view] ?? "StudyTracker";

  const activeTimer = useStudyStore((s) => s.activeTimer);

  return (
    <IconContext.Provider value={{ weight: "bold" }}>
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar route={route} navigate={navigate} onOpenPalette={() => setPaletteOpen(true)} />

      {/* Mobile sidebar (sheet) */}
      <MobileSidebar
        route={route}
        navigate={(r) => {
          navigate(r);
          setMobileNavOpen(false);
        }}
        onOpenPalette={() => {
          setPaletteOpen(true);
          setMobileNavOpen(false);
        }}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
      />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-5">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            {isMobile && (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
            )}
            <h1 className="truncate text-sm font-semibold md:text-base">{title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <FocusControl />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setPaletteOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Scrollable content */}
        <main
          id="main-scroll"
          className="st-scroll min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6"
        >
          <div className={`mx-auto max-w-6xl ${activeTimer ? "pb-24" : "pb-6"}`}>
            <ViewSwitch route={route} navigate={navigate} />
          </div>
        </main>
      </div>

      {/* Floating timer */}
      <TimerBar />

      {/* Command palette */}
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        navigate={navigate}
        startTimer={startTimer}
      />
    </div>
    </IconContext.Provider>
  );
}

function ViewSwitch({
  route,
  navigate,
}: {
  route: Route;
  navigate: (r: Route) => void;
}) {
  switch (route.view) {
    case "dashboard":
      return <DashboardView navigate={navigate} />;
    case "analytics":
      return <AnalyticsView />;
    case "achievements":
      return <AchievementsView />;
    case "data":
      return <DataView />;
    case "track":
      return <TrackView subjectId={route.subjectId} navigate={navigate} />;
    default:
      return <DashboardView navigate={navigate} />;
  }
}

function toastShortcuts() {
  import("sonner").then(({ toast }) => {
    toast.info("Keyboard shortcuts", {
      description: [
        "⌘K — Quick find (search topics)",
        "g then d — Dashboard",
        "g then a — Analytics",
        "g then c — Achievements",
        "g then s — Data & Settings",
        "? — Show this help",
      ].join("\n"),
      duration: 6000,
    });
  });
}
