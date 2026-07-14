"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LineChart,
  Trophy,
  Database,
  Search,
  GraduationCap,
} from "lucide-react";
import { CURRICULUM } from "@/lib/curriculum";
import { useStudyStore, subjectStats } from "@/lib/store";
import type { Route } from "./use-hash-route";
import { cn } from "@/lib/utils";
import { fmtPct } from "@/lib/format";
import { ProgressRing } from "./progress-ring";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const NAV_ITEMS: { view: Route["view"]; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { view: "analytics", label: "Analytics", icon: <LineChart className="h-4 w-4" /> },
  { view: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
  { view: "data", label: "Data & Settings", icon: <Database className="h-4 w-4" /> },
];

interface SidebarProps {
  route: Route;
  navigate: (r: Route) => void;
  onOpenPalette: () => void;
}

function SidebarInner({ route, navigate, onOpenPalette }: SidebarProps) {
  // subscribe to progress so the sidebar re-renders when progress changes
  const progress = useStudyStore((s) => s.progress);

  const isActive = (view: Route["view"], subjectId?: string) => {
    if (route.view !== view) return false;
    if (view === "track") return route.view === "track" && route.subjectId === subjectId;
    return true;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold tracking-tight">StudyTracker</div>
          <div className="truncate text-[11px] text-muted-foreground">learning command center</div>
        </div>
      </div>

      {/* Quick find */}
      <div className="px-3 pb-2">
        <button
          onClick={onOpenPalette}
          className="flex w-full items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-muted"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1">Quick find…</span>
          <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>
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

      {/* Footer */}
      <div className="border-t px-4 py-3 text-[10px] text-muted-foreground">
        <div>Local-first · press <kbd className="rounded border bg-muted px-1 py-0.5 font-mono">?</kbd> for shortcuts</div>
        <div className="mt-0.5 opacity-70">v3 · Striver A2Z + GFG · {Object.keys(progress).length} topics tracked</div>
      </div>
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
