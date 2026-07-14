"use client";

import * as React from "react";
import {
  ArrowLeft,
  Search,
  Star,
  Clock,
  CheckCircle2,
  Circle,
  Loader,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCheck,
  RotateCcw,
} from "lucide-react";
import { useStudyStore, subjectStats, sectionStats } from "@/lib/store";
import { SUBJECT_MAP, sectionTopics } from "@/lib/curriculum";
import type { Route } from "../use-hash-route";
import type { TopicStatus } from "@/lib/types";
import { fmtDuration, fmtPct } from "@/lib/format";
import { ProgressRing } from "../progress-ring";
import { TopicRow } from "../topic-row";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FILTERS: { value: TopicStatus | "starred" | "all"; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All", icon: <Circle className="h-3.5 w-3.5" /> },
  { value: "todo", label: "To do", icon: <Circle className="h-3.5 w-3.5" /> },
  { value: "doing", label: "In progress", icon: <Loader className="h-3.5 w-3.5" /> },
  { value: "done", label: "Done", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  { value: "starred", label: "Starred", icon: <Star className="h-3.5 w-3.5" /> },
];

export function TrackView({
  subjectId,
  navigate,
}: {
  subjectId: string;
  navigate: (r: Route) => void;
}) {
  const sub = SUBJECT_MAP[subjectId];
  const progress = useStudyStore((s) => s.progress);
  const markSectionDone = useStudyStore((s) => s.markSectionDone);
  const resetSubject = useStudyStore((s) => s.resetSubject);

  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<string>("all");
  const [openSections, setOpenSections] = React.useState<Set<number>>(new Set([0]));

  if (!sub) {
    return (
      <div className="p-8 text-center text-muted-foreground">Track not found.</div>
    );
  }

  const stats = subjectStats(subjectId);

  const toggleSection = (si: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(si)) next.delete(si);
      else next.add(si);
      return next;
    });
  };

  const matchesFilter = (qid: string, status: TopicStatus): boolean => {
    if (filter === "all") return true;
    if (filter === "starred") return !!progress[qid]?.starred;
    return status === filter;
  };

  const matchesQuery = (name: string): boolean => {
    if (!query.trim()) return true;
    return name.toLowerCase().includes(query.trim().toLowerCase());
  };

  return (
    <div className="st-fade-in space-y-4">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-3 h-7 text-xs text-muted-foreground"
          onClick={() => navigate({ view: "dashboard" })}
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Dashboard
        </Button>

        <Card className="overflow-hidden">
          <div
            className="h-1.5 w-full"
            style={{ backgroundColor: sub.color }}
          />
          <CardContent className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <ProgressRing value={stats.pct} size={64} stroke={6} color={sub.color}>
                  <span className="text-sm font-bold" style={{ color: sub.color }}>
                    {fmtPct(stats.pct)}
                  </span>
                </ProgressRing>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight">{sub.name}</h1>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-bold"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${sub.color} 16%, transparent)`,
                        color: sub.color,
                      }}
                    >
                      {sub.short}
                    </span>
                  </div>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">{sub.desc}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {stats.done}/{stats.total} done</span>
                    <span className="flex items-center gap-1"><Loader className="h-3.5 w-3.5 text-amber-500" /> {stats.doing} in progress</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-400" /> {stats.starred} starred</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-cyan-500" /> {fmtDuration(stats.seconds)}</span>
                    <span>· source: {sub.source}</span>
                  </div>
                </div>
              </div>

              {/* Difficulty breakdown */}
              <div className="flex gap-2">
                {(["Easy", "Medium", "Hard"] as const).map((d) => {
                  const ds = stats.diff[d];
                  if (ds.total === 0) return null;
                  return (
                    <div key={d} className="rounded-lg border bg-card px-3 py-2 text-center">
                      <div className="text-[10px] uppercase text-muted-foreground">{d}</div>
                      <div className="text-sm font-bold">{ds.done}<span className="text-xs font-normal text-muted-foreground">/{ds.total}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${sub._total} topics…`}
            className="pl-9"
          />
        </div>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v)}
          variant="outline"
          size="sm"
        >
          {FILTERS.map((f) => (
            <ToggleGroupItem key={f.value} value={f.value} className="gap-1 text-xs">
              {f.icon}
              <span className="hidden sm:inline">{f.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-destructive">
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset track
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset "{sub.name}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear all progress, time, notes and stars for every topic in this track. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                  resetSubject(subjectId);
                  toast.success(`Reset progress for ${sub.name}`);
                }}
              >
                Reset track
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {sub.sections.map((sec, si) => {
          const topics = sectionTopics(subjectId, si);
          const sStats = sectionStats(subjectId, si);
          const visible = topics.filter(
            (t) =>
              matchesQuery(t.name) &&
              matchesFilter(t.qid, progress[t.qid]?.status ?? "todo"),
          );
          const isOpen = openSections.has(si);
          const hasActiveFilter = filter !== "all" || !!query.trim();

          return (
            <Collapsible
              key={si}
              open={isOpen || hasActiveFilter}
              onOpenChange={() => toggleSection(si)}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center gap-3 p-3 text-left hover:bg-muted/40">
                    {isOpen || hasActiveFilter ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{sec.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {sStats.done}/{sStats.total} done
                        {sStats.seconds > 0 && ` · ${fmtDuration(sStats.seconds)}`}
                        {visible.length !== sStats.total && ` · ${visible.length} shown`}
                      </div>
                    </div>
                    {/* mini progress bar */}
                    <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${sStats.pct * 100}%`, backgroundColor: sub.color }}
                      />
                    </div>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground">
                      {fmtPct(sStats.pct)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-[11px] text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        markSectionDone(subjectId, si);
                        toast.success(`Marked all in "${sec.name}" as done`);
                      }}
                    >
                      <CheckCheck className="mr-1 h-3 w-3" /> All done
                    </Button>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="st-scroll max-h-[480px] overflow-y-auto border-t px-2 py-2">
                    {visible.length === 0 ? (
                      <div className="py-6 text-center text-xs text-muted-foreground">
                        No topics match the current filter.
                      </div>
                    ) : (
                      visible.map((t) => <TopicRow key={t.qid} topic={t} />)
                    )}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
