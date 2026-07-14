"use client";

import * as React from "react";
import {
  Flame,
  Clock,
  TrendingUp,
  Layers,
  ArrowRight,
  Calendar,
  Zap,
  Target,
} from "@/lib/icons";
import {
  useStudyStore,
  overallStats,
  todaySeconds,
  goalPct,
  streak,
  longestStreak,
  activeDays,
  recentActivity,
  upNext,
  gamification,
  pollNewAchievements,
} from "@/lib/store";
import { CURRICULUM, SUBJECT_MAP } from "@/lib/curriculum";
import type { Route } from "../use-hash-route";
import { fmtDuration, fmtDurationLong, fmtPct, fmtAgo } from "@/lib/format";
import { ProgressRing } from "../progress-ring";
import { Heatmap } from "../heatmap";
import { TopicMini } from "../topic-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function DashboardView({ navigate }: { navigate: (r: Route) => void }) {
  // subscribe so it re-renders on progress changes
  useStudyStore((s) => s.progress);
  useStudyStore((s) => s.daily);
  const goalMin = useStudyStore((s) => s.settings.dailyGoalMin);

  const o = overallStats();
  const todaySec = todaySeconds();
  const goal = goalPct();
  const curStreak = streak();
  const longest = longestStreak();
  const days = activeDays();
  const recent = recentActivity(6);
  const next = upNext(5);
  const game = gamification();

  // poll for newly unlocked achievements on mount + when stats change
  React.useEffect(() => {
    const fresh = pollNewAchievements();
    fresh.forEach((a) =>
      toast.success(`Achievement unlocked: ${a.name}`, { description: a.desc }),
    );
  }, [o.done, o.seconds, curStreak]);

  return (
    <div className="st-fade-in space-y-4">
      {/* Hero row: level + daily goal + overall */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Level card */}
        <Card className="relative overflow-hidden border-amber-500/30 premium-card-hover">
          <CardContent className="relative p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Level {game.level} · {game.title}
                </div>
                <div className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-foreground">
                  {game.xp.toLocaleString()} XP
                </div>
              </div>
              <ProgressRing value={game.pct} size={56} stroke={5} color="#f59e0b">
                <span className="text-sm font-black">{game.level}</span>
              </ProgressRing>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>{game.floor.toLocaleString()}</span>
                <span>{game.next.toLocaleString()}</span>
              </div>
              <Progress value={game.pct * 100} className="h-1.5 [&>div]:bg-amber-500" />
              <div className="mt-1 text-[11px] font-medium text-muted-foreground">
                {Math.max(0, game.next - game.xp).toLocaleString()} XP to level {game.level + 1}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily goal card */}
        <Card className={cn(
          "premium-card-hover transition-all duration-300",
          goal >= 1 && "border-emerald-500/30 bg-emerald-500/[0.04]"
        )}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className={cn(
                  "text-[11px] font-bold uppercase tracking-wider",
                  goal >= 1 ? "text-emerald-500" : "text-muted-foreground"
                )}>
                  Today
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight tabular-nums">
                  {fmtDurationLong(todaySec)}
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  goal: {goalMin} min
                </div>
              </div>
              <ProgressRing value={goal} size={56} stroke={5} color={goal >= 1 ? "#10b981" : "#22c55e"}>
                <span className="text-xs font-black" style={{ color: goal >= 1 ? "#10b981" : "#22c55e" }}>
                  {fmtPct(goal)}
                </span>
              </ProgressRing>
            </div>
            <div className="mt-3">
              <Progress value={goal * 100} className={cn("h-1.5", goal >= 1 && "[&>div]:bg-emerald-500")} />
              <div className="mt-1 text-[11px] font-medium text-muted-foreground">
                {goal >= 1
                  ? "Daily goal reached!"
                  : `${fmtDuration(Math.max(0, goalMin * 60 - todaySec))} to go`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall progress card */}
        <Card className="premium-card-hover border-violet-500/20">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-violet-500">
                  Overall progress
                </div>
                <div className="mt-1 text-2xl font-black tracking-tight tabular-nums">
                  {o.done}
                  <span className="text-base font-normal text-muted-foreground">/{o.total}</span>
                </div>
                <div className="text-[11px] font-medium text-muted-foreground">topics completed</div>
              </div>
              <ProgressRing value={o.pct} size={56} stroke={5} color="var(--primary)">
                <span className="text-xs font-black">{fmtPct(o.pct)}</span>
              </ProgressRing>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-muted-foreground">
              <span>{o.doing} in progress</span>
              <span>·</span>
              <span>{o.starred} starred</span>
              <span>·</span>
              <span>{o.tracksStarted}/10 tracks started</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile icon={<Flame className="h-4 w-4" />} label="Current streak" value={`${curStreak}d`} accent="#f97316" />
        <StatTile icon={<TrendingUp className="h-4 w-4" />} label="Longest streak" value={`${longest}d`} accent="#ec4899" />
        <StatTile icon={<Clock className="h-4 w-4" />} label="Total study time" value={fmtDuration(o.seconds)} accent="#06b6d4" />
        <StatTile icon={<Calendar className="h-4 w-4" />} label="Active days" value={`${days}`} accent="#10b981" />
      </div>

      {/* Continue + Recent */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-amber-500" />
              Continue where you left off
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[230px] overflow-y-auto st-scroll pr-1.5 space-y-1">
            {next.length === 0 ? (
              <EmptyHint text="Start a track to see your next topics here." />
            ) : (
              next.map((item) => <TopicMini key={item.qid} qid={item.qid} />)
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-cyan-500" />
                Recent sessions
              </CardTitle>
              {recent.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => navigate({ view: "analytics" })}
                >
                  Analytics <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="max-h-[230px] overflow-y-auto st-scroll pr-1.5 space-y-1">
            {recent.length === 0 ? (
              <EmptyHint text="Your study sessions will appear here." />
            ) : (
              recent.map((a, i) => {
                const sub = a.subjectId ? SUBJECT_MAP[a.subjectId] : undefined;
                return (
                  <button
                    key={i}
                    onClick={() => a.subjectId && navigate({ view: "track", subjectId: a.subjectId })}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-muted/50"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: sub?.color ?? "var(--muted-foreground)" }}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">{a.name ?? "Topic"}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {fmtDuration(a.dur)}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {fmtAgo(a.ts)}
                    </span>
                  </button>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Heatmap — full width section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-emerald-500" />
              Activity heatmap
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Heatmap />
        </CardContent>
      </Card>

      {/* Track overview grid */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Layers className="h-4 w-4 text-violet-500" />
              Your tracks
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {o.done}/{o.total} done
            </span>
          </div>
        </CardHeader>
        <CardContent className="max-h-[235px] overflow-y-auto st-scroll pr-1.5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CURRICULUM.map((sub) => {
              const s = o.bySubject.find((b) => b.id === sub.id)!;
              return (
                <button
                  key={sub.id}
                  onClick={() => navigate({ view: "track", subjectId: sub.id })}
                  className="group rounded-xl border bg-card p-3 text-left transition-all hover:border-foreground/20 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <ProgressRing value={s.pct} size={36} stroke={4} color={sub.color}>
                      <span className="text-[10px] font-bold" style={{ color: sub.color }}>
                        {s.done > 0 ? fmtPct(s.pct) : "0%"}
                      </span>
                    </ProgressRing>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        backgroundColor: `color-mix(in oklch, ${sub.color} 16%, transparent)`,
                        color: sub.color,
                      }}
                    >
                      {sub.short}
                    </span>
                  </div>
                  <div className="mt-2 truncate text-xs font-medium">{sub.name}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {s.done}/{s.total} · {fmtDuration(s.seconds)}
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${s.pct * 100}%`, backgroundColor: sub.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <Card className="premium-card-hover">
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`,
            color: accent,
          }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="truncate text-[11px] text-muted-foreground">{label}</div>
          <div className="text-lg font-bold tabular-nums">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-10 text-center">
      <Target className="h-5 w-5 text-muted-foreground/60" />
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  );
}
