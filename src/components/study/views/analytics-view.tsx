"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Clock,
  PieChart as PieIcon,
  TrendingUp,
  Activity,
  BookOpen,
  Calendar,
  Timer,
  Target,
  Layers,
} from "@/lib/icons";
import {
  useStudyStore,
  overallStats,
  dailySeries,
  streak,
  longestStreak,
  activeDays,
  longestSession,
} from "@/lib/store";
import { SUBJECT_MAP, ITEM_INDEX } from "@/lib/curriculum";
import { fmtDuration, fmtDurationLong, fmtPct, monthShort } from "@/lib/format";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const DIFF_COLORS: Record<string, string> = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const AXIS_TICK = { fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 500 } as const;
const GRID = { stroke: "var(--border)", strokeOpacity: 0.6, strokeDasharray: "3 3" } as const;

interface SessionRow {
  qid: string;
  topicName: string;
  subjectId: string;
  dur: number;
  ts: number;
  date: string;
}

/* -------------------- Premium shared tooltip -------------------- */
interface TipPayload {
  value?: number | string;
  name?: string;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown> & { color?: string; fill?: string };
}
function ChartTooltip({
  active,
  payload,
  label,
  format,
  labelFormat,
}: {
  active?: boolean;
  payload?: TipPayload[];
  label?: string | number;
  format?: (v: number) => string;
  labelFormat?: (l: string | number, p: TipPayload[]) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const head = labelFormat ? labelFormat(label ?? "", payload) : label;
  return (
    <div className="min-w-[120px] rounded-xl border border-border/70 bg-popover/95 px-3 py-2 shadow-xl backdrop-blur-sm">
      {head != null && head !== "" && (
        <div className="mb-1.5 text-[11px] font-semibold text-muted-foreground">{head}</div>
      )}
      {payload.map((p, i) => {
        const dot = p.payload?.color || p.payload?.fill || p.color || "var(--primary)";
        const val = typeof p.value === "number" ? p.value : Number(p.value) || 0;
        return (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dot }} />
            <span className="font-bold tabular-nums text-foreground">
              {format ? format(val) : val}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function AnalyticsView() {
  const progress = useStudyStore((s) => s.progress);
  const daily = useStudyStore((s) => s.daily);

  const [range, setRange] = useState("30");

  const o = useMemo(() => overallStats(), [progress, daily]);
  const curStreak = useMemo(() => streak(), [daily]);
  const longest = useMemo(() => longestStreak(), [daily]);
  const days = useMemo(() => activeDays(), [daily]);
  const longestSess = useMemo(() => longestSession(), [progress]);

  const allSessions = useMemo<SessionRow[]>(() => {
    const list: SessionRow[] = [];
    for (const qid of Object.keys(progress)) {
      const p = progress[qid];
      const topic = ITEM_INDEX[qid];
      if (!topic || !p?.sessions) continue;
      for (const s of p.sessions) {
        list.push({ qid, topicName: topic.name, subjectId: topic.subjectId, dur: s.dur, ts: s.ts, date: s.date });
      }
    }
    return list.sort((a, b) => b.ts - a.ts);
  }, [progress]);

  const totalSessions = allSessions.length;
  const avgSessionSec = totalSessions
    ? Math.round(allSessions.reduce((acc, s) => acc + s.dur, 0) / totalSessions)
    : 0;

  const lineData = useMemo(() => {
    const series = dailySeries(parseInt(range, 10) || 30);
    return series.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return { date: d.date, label: `${monthShort(date)} ${date.getDate()}`, minutes: Math.round(d.seconds / 60) };
    });
  }, [range, daily]);

  const totalLineMinutes = lineData.reduce((a, b) => a + b.minutes, 0);
  const avgDaily = lineData.length ? totalLineMinutes / lineData.length : 0;
  const xInterval = lineData.length > 7 ? Math.ceil(lineData.length / 7) : 0;

  const diffPie = (["Easy", "Medium", "Hard"] as const)
    .map((k) => ({ name: k, value: o.diff[k].done, total: o.diff[k].total, color: DIFF_COLORS[k] }))
    .filter((d) => d.total > 0);
  const diffTotalTracked = o.diff.Easy.total + o.diff.Medium.total + o.diff.Hard.total;
  const totalCompleted = diffPie.reduce((acc, curr) => acc + curr.value, 0);

  const byTrack = useMemo(
    () =>
      o.bySubject
        .map((s) => ({ name: s.short, fullName: s.name, color: s.color, seconds: s.seconds, minutes: Math.round(s.seconds / 60) }))
        .filter((s) => s.seconds > 0)
        .sort((a, b) => b.seconds - a.seconds),
    [o],
  );

  const cumulativeData = useMemo(() => {
    const countsByDate: Record<string, number> = {};
    for (const qid of Object.keys(progress)) {
      const p = progress[qid];
      if (p.status !== "done" || !p.completedAt) continue;
      const dateStr = p.sessions.length > 0 ? p.sessions[p.sessions.length - 1].date : localDateKey(p.completedAt);
      countsByDate[dateStr] = (countsByDate[dateStr] || 0) + 1;
    }
    const sortedDates = Object.keys(countsByDate).sort();
    let total = 0;
    return sortedDates.map((dateStr) => {
      total += countsByDate[dateStr];
      const date = new Date(dateStr + "T00:00:00");
      return { dateStr, label: `${monthShort(date)} ${date.getDate()}`, completed: total };
    });
  }, [progress]);

  const hourlyData = useMemo(() => {
    const brackets: Record<string, number> = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
    for (const s of allSessions) {
      const hr = new Date(s.ts).getHours();
      if (hr >= 6 && hr < 12) brackets.Morning += s.dur;
      else if (hr >= 12 && hr < 18) brackets.Afternoon += s.dur;
      else if (hr >= 18 && hr < 24) brackets.Evening += s.dur;
      else brackets.Night += s.dur;
    }
    return Object.keys(brackets).map((name) => ({ name, minutes: Math.round(brackets[name] / 60) }));
  }, [allSessions]);

  const weekdayData = useMemo(() => {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const secs = [0, 0, 0, 0, 0, 0, 0];
    for (const s of allSessions) secs[new Date(s.ts).getDay()] += s.dur;
    return names.map((name, i) => ({ name, minutes: Math.round(secs[i] / 60) }));
  }, [allSessions]);

  const hasAnyTime = o.seconds > 0;

  return (
    <div className="st-fade-in space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <MiniStat icon={<TrendingUp className="h-4 w-4" />} label="Current streak" value={`${curStreak}d`} accent="#f97316" />
        <MiniStat icon={<Activity className="h-4 w-4" />} label="Longest streak" value={`${longest}d`} accent="#ec4899" />
        <MiniStat icon={<Clock className="h-4 w-4" />} label="Longest session" value={fmtDuration(longestSess)} accent="#06b6d4" />
        <MiniStat icon={<Timer className="h-4 w-4" />} label="Avg session" value={fmtDuration(avgSessionSec)} accent="#8b5cf6" />
        <MiniStat icon={<BookOpen className="h-4 w-4" />} label="Total sessions" value={`${totalSessions}`} accent="#f59e0b" />
        <MiniStat icon={<Calendar className="h-4 w-4" />} label="Active days" value={`${days}`} accent="#10b981" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Study time */}
        <ChartCard
          icon={<TrendingUp className="h-4 w-4" />}
          accent="#06b6d4"
          title="Study time"
          subtitle={`${fmtDurationLong(o.seconds)} total · ${Math.round(avgDaily)} min/day avg`}
          right={
            <ToggleGroup type="single" value={range} onValueChange={(v) => v && setRange(v)} variant="outline" size="sm">
              {["7", "30", "60", "90"].map((r) => (
                <ToggleGroupItem key={r} value={r} className="px-2.5 text-xs font-semibold">{r}d</ToggleGroupItem>
              ))}
            </ToggleGroup>
          }
        >
          {hasAnyTime ? (
            <ChartFrame>
              <AreaChart data={lineData} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-time" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID} vertical={false} />
                <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} interval={xInterval} minTickGap={12} />
                <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={30} tickFormatter={(v) => `${v}m`} />
                <RTooltip cursor={{ stroke: "#06b6d4", strokeOpacity: 0.3 }} content={<ChartTooltip format={(v) => `${v} min`} />} />
                <Area type="monotone" dataKey="minutes" stroke="#06b6d4" strokeWidth={2.5} fill="url(#grad-time)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--background)" }} animationDuration={700} />
              </AreaChart>
            </ChartFrame>
          ) : (
            <EmptyChart text="No study time logged yet. Start a focus timer on any topic." />
          )}
        </ChartCard>

        {/* Cumulative completions */}
        <ChartCard
          icon={<Target className="h-4 w-4" />}
          accent="#10b981"
          title="Topics completed over time"
          subtitle={`${o.done} completed · ${fmtPct(o.pct)} of ${o.total}`}
        >
          {cumulativeData.length > 0 ? (
            <ChartFrame>
              <AreaChart data={cumulativeData} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-cum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID} vertical={false} />
                <XAxis dataKey="label" tick={AXIS_TICK} tickLine={false} axisLine={false} interval={cumulativeData.length > 7 ? Math.ceil(cumulativeData.length / 7) : 0} minTickGap={12} />
                <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={28} allowDecimals={false} />
                <RTooltip cursor={{ stroke: "#10b981", strokeOpacity: 0.3 }} content={<ChartTooltip format={(v) => `${v} done`} />} />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} fill="url(#grad-cum)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--background)" }} animationDuration={700} />
              </AreaChart>
            </ChartFrame>
          ) : (
            <EmptyChart text="Mark topics as done to chart your progress over time." />
          )}
        </ChartCard>

        {/* Weekly routine */}
        <ChartCard icon={<Calendar className="h-4 w-4" />} accent="#f59e0b" title="Weekly routine" subtitle="Focus minutes by day of week">
          {hasAnyTime ? (
            <ChartFrame height={200}>
              <BarChart data={weekdayData} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-week" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID} vertical={false} />
                <XAxis dataKey="name" tick={AXIS_TICK} tickLine={false} axisLine={false} />
                <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={30} tickFormatter={(v) => `${v}m`} />
                <RTooltip cursor={{ fill: "var(--muted)", fillOpacity: 0.15, radius: 6 }} content={<ChartTooltip format={(v) => fmtDuration(v * 60)} />} />
                <Bar dataKey="minutes" fill="url(#grad-week)" radius={[6, 6, 0, 0]} maxBarSize={34} animationDuration={650} />
              </BarChart>
            </ChartFrame>
          ) : (
            <EmptyChart text="Log a few sessions to reveal your weekly rhythm." />
          )}
        </ChartCard>

        {/* Time of day */}
        <ChartCard icon={<Clock className="h-4 w-4" />} accent="#8b5cf6" title="Time-of-day pattern" subtitle="When you focus best">
          {hasAnyTime ? (
            <ChartFrame height={200}>
              <BarChart data={hourlyData} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad-hour" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...GRID} vertical={false} />
                <XAxis dataKey="name" tick={AXIS_TICK} tickLine={false} axisLine={false} />
                <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={30} tickFormatter={(v) => `${v}m`} />
                <RTooltip cursor={{ fill: "var(--muted)", fillOpacity: 0.15, radius: 6 }} content={<ChartTooltip format={(v) => fmtDuration(v * 60)} />} />
                <Bar dataKey="minutes" fill="url(#grad-hour)" radius={[6, 6, 0, 0]} maxBarSize={52} animationDuration={650} />
              </BarChart>
            </ChartFrame>
          ) : (
            <EmptyChart text="Your peak focus hours will appear here." />
          )}
        </ChartCard>

        {/* Difficulty donut */}
        <ChartCard icon={<PieIcon className="h-4 w-4" />} accent="#ef4444" title="Difficulty breakdown" subtitle="Solved DSA topics by difficulty">
          {diffTotalTracked === 0 || totalCompleted === 0 ? (
            <EmptyChart text="Complete some difficulty-tagged DSA topics to see this." />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap">
              <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={diffPie} dataKey="value" nameKey="name" innerRadius={56} outerRadius={78} paddingAngle={4} cornerRadius={6} strokeWidth={0} animationDuration={700}>
                      {diffPie.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <RTooltip content={<ChartTooltip labelFormat={(_l, p) => String(p[0]?.payload?.name ?? "")} format={(v) => `${v} solved`} />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black tabular-nums leading-none">{totalCompleted}</span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Solved</span>
                </div>
              </div>
              <div className="w-full flex-1 space-y-2.5 sm:w-auto">
                {diffPie.map((d) => (
                  <div key={d.name} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="flex-1 font-semibold">{d.name}</span>
                      <span className="font-black tabular-nums">{d.value}</span>
                      <span className="text-[10px] font-medium text-muted-foreground">/ {d.total}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full transition-all" style={{ width: `${d.total ? (d.value / d.total) * 100 : 0}%`, backgroundColor: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ChartCard>

        {/* Focus by track */}
        <ChartCard icon={<Layers className="h-4 w-4" />} accent="#3b82f6" title="Focus by track" subtitle="Study time spent per subject">
          {byTrack.length === 0 ? (
            <EmptyChart text="Study a topic to see per-track time." />
          ) : (
            <div className="w-full" style={{ height: Math.max(180, byTrack.length * 36) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byTrack} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }} barCategoryGap="22%">
                  <CartesianGrid {...GRID} horizontal={false} />
                  <XAxis type="number" tick={AXIS_TICK} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}m`} />
                  <YAxis type="category" dataKey="name" tick={{ ...AXIS_TICK, fontWeight: 600 }} tickLine={false} axisLine={false} width={48} />
                  <RTooltip
                    cursor={{ fill: "var(--muted)", fillOpacity: 0.15, radius: 6 }}
                    content={<ChartTooltip labelFormat={(_l, p) => String(p[0]?.payload?.fullName ?? "")} format={(v) => fmtDuration(v * 60)} />}
                  />
                  <Bar dataKey="minutes" radius={[0, 6, 6, 0]} maxBarSize={24} animationDuration={650}>
                    {byTrack.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </div>

      {/* Session history */}
      <Card className="premium-card-hover overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "color-mix(in oklch, #8b5cf6 15%, transparent)", color: "#8b5cf6" }}>
              <Timer className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-bold">Focus session history</div>
              <div className="text-xs text-muted-foreground">Every completed focus session</div>
            </div>
          </div>
          {allSessions.length > 0 && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold tabular-nums text-muted-foreground">
              {allSessions.length} session{allSessions.length === 1 ? "" : "s"}
            </span>
          )}
        </CardHeader>
        <CardContent className="p-0">
          {allSessions.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted-foreground">No focus sessions recorded yet. Start a timer on any topic to begin.</div>
          ) : (
            <div className="st-scroll max-h-[360px] overflow-y-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur">
                  <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    <th className="py-3 pl-5 pr-4 font-semibold">Topic</th>
                    <th className="px-4 py-3 font-semibold">Track</th>
                    <th className="px-4 py-3 text-right font-semibold">Duration</th>
                    <th className="py-3 pl-4 pr-5 text-right font-semibold hidden sm:table-cell">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {allSessions.map((log, i) => {
                    const sub = SUBJECT_MAP[log.subjectId];
                    return (
                      <tr key={`${log.qid}-${log.ts}-${i}`} className="transition-colors hover:bg-muted/40">
                        <td className="max-w-[200px] truncate py-3 pl-5 pr-4 font-semibold text-foreground">{log.topicName}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: sub ? `color-mix(in oklch, ${sub.color} 12%, transparent)` : "var(--muted)", color: sub?.color ?? "var(--muted-foreground)" }}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sub?.color ?? "var(--muted-foreground)" }} />
                            {sub?.name ?? log.subjectId}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-muted-foreground">{fmtDuration(log.dur)}</td>
                        <td className="py-3 pl-4 pr-5 text-right font-medium tabular-nums text-muted-foreground hidden sm:table-cell">
                          {new Date(log.ts).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function ChartCard({
  icon,
  accent,
  title,
  subtitle,
  right,
  children,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="premium-card-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in oklch, ${accent} 15%, transparent)`, color: accent }}>
              {icon}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight">{title}</div>
              {subtitle && <div className="mt-0.5 text-xs font-medium text-muted-foreground">{subtitle}</div>}
            </div>
          </div>
          {right}
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

function ChartFrame({ children, height = 224 }: { children: React.ReactElement; height?: number }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function localDateKey(ts: number): string {
  const d = new Date(ts);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function MiniStat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <Card className="premium-card-hover">
      <CardContent className="flex items-center gap-3 p-3.5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in oklch, ${accent} 14%, transparent)`,
            color: accent,
            boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${accent} 22%, transparent)`,
          }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-2xl font-black leading-none tracking-tight tabular-nums">{value}</div>
          <div className="mt-1.5 whitespace-normal text-[9px] font-semibold uppercase leading-tight tracking-normal text-muted-foreground sm:text-[10px]">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyChart({ text }: { text: string }) {
  return (
    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed px-4 text-center text-xs text-muted-foreground">
      {text}
    </div>
  );
}
