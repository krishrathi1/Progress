"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LineChart,
  Trophy,
  Crown,
  Database,
  GraduationCap,
} from "@/lib/icons";
import { CURRICULUM } from "@/lib/curriculum";
import { useStudyStore, subjectStats } from "@/lib/store";
import type { Route } from "./use-hash-route";
import { cn } from "@/lib/utils";
import { fmtPct } from "@/lib/format";
import { ProgressRing } from "./progress-ring";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS: { view: Route["view"]; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { view: "analytics", label: "Analytics", icon: <LineChart className="h-4 w-4" /> },
  { view: "leaderboard", label: "Leaderboard", icon: <Crown className="h-4 w-4" /> },
  { view: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
  { view: "data", label: "Data & Settings", icon: <Database className="h-4 w-4" /> },
];

interface SidebarProps {
  route: Route;
  navigate: (r: Route) => void;
}

function SidebarInner({ route, navigate }: SidebarProps) {
  // subscribe to progress so the sidebar re-renders when progress changes
  useStudyStore((s) => s.progress);

  const isActive = (view: Route["view"], subjectId?: string) => {
    if (route.view !== view) return false;
    if (view === "track") return route.view === "track" && route.subjectId === subjectId;
    return true;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-amber-500 text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display truncate text-[15px] font-extrabold leading-none">Studytracker</div>
          <div className="mt-1 truncate text-[10.5px] font-medium text-muted-foreground">Learning dashboard</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => navigate({ view: item.view } as Route)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive(item.view)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Tracks */}
      <div className="mt-4 flex items-center justify-between px-4 pb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Tracks
        </span>
        <span className="text-[10px] text-muted-foreground">{CURRICULUM.length}</span>
      </div>
      <nav className="st-scroll min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
        {CURRICULUM.map((sub) => {
          const s = subjectStats(sub.id);
          const active = isActive("track", sub.id);
          return (
            <button
              key={sub.id}
              onClick={() => navigate({ view: "track", subjectId: sub.id })}
              className={cn(
                "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                active ? "bg-muted" : "hover:bg-muted/60",
              )}
            >
              <ProgressRing
                value={s.pct}
                size={26}
                stroke={3}
                color={sub.color}
              >
                <span className="text-[9px] font-bold" style={{ color: sub.color }}>
                  {s.done > 0 ? fmtPct(s.pct) : "•"}
                </span>
              </ProgressRing>
              <div className="min-w-0 flex-1">
                <div className={cn("truncate text-xs font-medium", active && "text-foreground")}>
                  {sub.name}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {s.done}/{s.total} topics
                </div>
              </div>
              {active && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: sub.color }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar md:flex md:flex-col">
        <SidebarInner {...props} />
      </aside>
    );
  }

  return null;
}

export function MobileSidebar(props: SidebarProps & { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarInner {...props} />
      </SheetContent>
    </Sheet>
  );
}
