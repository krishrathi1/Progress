"use client";

import * as React from "react";
import {
  Flag,
  Zap,
  Medal,
  Trophy,
  Clock,
  Flame,
  Target,
  Compass,
  Layers,
  Crown,
  Check,
  Lock,
} from "lucide-react";
import { achievements, gamification, overallStats } from "@/lib/store";
import { useStudyStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "../progress-ring";
import { fmtPct } from "@/lib/format";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  flag: <Flag className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  medal: <Medal className="h-6 w-6" />,
  trophy: <Trophy className="h-6 w-6" />,
  clock: <Clock className="h-6 w-6" />,
  flame: <Flame className="h-6 w-6" />,
  target: <Target className="h-6 w-6" />,
  compass: <Compass className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  crown: <Crown className="h-6 w-6" />,
  check: <Check className="h-6 w-6" />,
};

const TIER_COLOR: Record<string, string> = {
  bronze: "#b45309",
  silver: "#94a3b8",
  gold: "#f59e0b",
};

const TIER_LABEL: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
};

export function AchievementsView() {
  useStudyStore((s) => s.progress);
  useStudyStore((s) => s.daily);

  const all = achievements();
  const unlocked = all.filter((a) => a.unlocked);
  const game = gamification();
  const o = overallStats();

  return (
    <div className="st-fade-in space-y-5">
      {/* Hero */}
      <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-card to-card">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
        <CardContent className="relative flex flex-wrap items-center justify-between gap-6 p-6">
          <div className="flex items-center gap-4">
            <ProgressRing value={unlocked.length / all.length} size={72} stroke={6} color="#f59e0b">
              <Trophy className="h-7 w-7 text-amber-500" />
            </ProgressRing>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Achievements
              </div>
              <div className="text-2xl font-bold">
                {unlocked.length}<span className="text-lg font-normal text-muted-foreground">/{all.length} unlocked</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Level {game.level} · {game.title} · {o.done} topics · {fmtPct(unlocked.length / all.length)} complete
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {(["bronze", "silver", "gold"] as const).map((tier) => {
              const count = unlocked.filter((a) => a.tier === tier).length;
              return (
                <div key={tier} className="rounded-lg border bg-card px-4 py-2 text-center">
                  <div
                    className="mx-auto mb-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: TIER_COLOR[tier] }}
                  />
                  <div className="text-lg font-bold tabular-nums">{count}</div>
                  <div className="text-[10px] uppercase text-muted-foreground">{TIER_LABEL[tier]}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {all.map((a) => {
          const color = TIER_COLOR[a.tier];
          return (
            <Card
              key={a.id}
              className={cn(
                "relative overflow-hidden transition-all",
                a.unlocked
                  ? `tier-${a.tier}`
                  : "opacity-75",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      a.unlocked ? "text-white" : "text-muted-foreground",
                    )}
                    style={{
                      backgroundColor: a.unlocked
                        ? color
                        : "var(--muted)",
                    }}
                  >
                    {a.unlocked ? ICONS[a.icon] : <Lock className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-bold">{a.name}</span>
                      <span
                        className="rounded px-1 py-0.5 text-[9px] font-bold uppercase"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${color} 18%, transparent)`,
                          color,
                        }}
                      >
                        {a.tier}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={a.progress * 100}
                    className="h-1.5"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>{fmtPct(a.progress)}</span>
                    <span>{a.unlocked ? "Unlocked" : "Locked"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
