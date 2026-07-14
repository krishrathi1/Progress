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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DIFF_COLORS: Record<string, string> = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 11,
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
};

interface SessionRow {
  qid: string;
  topicName: string;
  subjectId: string;
  dur: number;
  ts: number;
  date: string;
}

export function AnalyticsView() {
  // Subscribe to the reactive slices so derived stats recompute on change.
  const progress = useStudyStore((s) => s.progress);
  const daily = useStudyStore((s) => s.daily);

  const [range, setRange] = useState("30");
  const [logPage, setLogPage] = useState(0);
  const itemsPerPage = 8;

  // ---- Derived stats (recomputed whenever progress/daily change) ----
  const o = useMemo(() => overallStats(), [progress, daily]);
  const curStreak = useMemo(() => streak(), [daily]);
  const longest = useMemo(() => longestStreak(), [daily]);
  const days = useMemo(() => activeDays(), [daily]);
  const longestSess = useMemo(() => longestSession(), [progress]);

  // ---- All study sessions (flattened, newest first) ----
  const allSessions = useMemo<SessionRow[]>(() => {
    const list: SessionRow[] = [];
    for (const qid of Object.keys(progress)) {
      const p = progress[qid];
      const topic = ITEM_INDEX[qid];
      if (!topic || !p?.sessions) continue;
      for (const s of p.sessions) {
        list.push({
          qid,
          topicName: topic.name,
          subjectId: topic.subjectId,
          dur: s.dur,
          ts: s.ts,
          date: s.date,
        });
      }
    }
    return list.sort((a, b) => b.ts - a.ts);
  }, [progress]);

  const totalSessions = allSessions.length;
  const avgSessionSec = totalSessions
    ? Math.round(allSessions.reduce((acc, s) => acc + s.dur, 0) / totalSessions)
    : 0;

  // ---- Study-time series over the selected range ----
  const lineData = useMemo(() => {
    const series = dailySeries(parseInt(range, 10) || 30);
    return series.map((d) => {
      const date = new Date(d.date + "T00:00:00");
      return {
        date: d.date,
        label: `${monthShort(date)} ${date.getDate()}`,
        minutes: Math.round(d.seconds / 60),
      };
    });
  }, [range, daily]);

  const totalLineMinutes = lineData.reduce((a, b) => a + b.minutes, 0);
  const avgDaily = lineData.length ? totalLineMinutes / lineData.length : 0;
  const xInterval = lineData.length > 7 ? Math.ceil(lineData.length / 7) : 0;

  // ---- Difficulty breakdown ----
  const diffPie = (["Easy", "Medium", "Hard"] as const)
    .map((k) => ({
      name: k,
      value: o.diff[k].done,
      total: o.diff[k].total,
      color: DIFF_COLORS[k],
    }))
    .filter((d) => d.total > 0);
  const diffTotalTracked =
    o.diff.Easy.total + o.diff.Medium.total + o.diff.Hard.total;
  const totalCompleted = diffPie.reduce((acc, curr) => acc + curr.value, 0);

  // ---- Time by track (minutes precomputed; no function dataKeys) ----
  const byTrack = useMemo(
    () =>
      o.bySubject
        .map((s) => ({
          name: s.short,
          fullName: s.name,
          color: s.color,
          seconds: s.seconds,
          minutes: Math.round(s.seconds / 60),
          done: s.done,
          total: s.total,
        }))
        .filter((s) => s.seconds > 0)
        .sort((a, b) => b.seconds - a.seconds),
    [o],
  );

  // ---- Cumulative completed topics over time ----
  const cumulativeData = useMemo(() => {
    const countsByDate: Record<string, number> = {};
    for (const qid of Object.keys(progress)) {
      const p = progress[qid];
      if (p.status !== "done" || !p.completedAt) continue;
      const dateStr =
        p.sessions.length > 0
          ? p.sessions[p.sessions.length - 1].date
          : localDateKey(p.completedAt);
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

  // ---- Hourly focus pattern (time-of-day brackets) ----
  const hourlyData = useMemo(() => {
    const brackets: Record<string, number> = {
      Morning: 0,
      Afternoon: 0,
      Evening: 0,
      Night: 0,
    };
    for (const s of allSessions) {
      const hr = new Date(s.ts).getHours();
      if (hr >= 6 && hr < 12) brackets.Morning += s.dur;
      else if (hr >= 12 && hr < 18) brackets.Afternoon += s.dur;
      else if (hr >= 18 && hr < 24) brackets.Evening += s.dur;
      else brackets.Night += s.dur;
    }
    return Object.keys(brackets).map((name) => ({
      name,
      minutes: Math.round(brackets[name] / 60),
    }));
  }, [allSessions]);

  // ---- Weekday routine ----
  const weekdayData = useMemo(() => {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const secs = [0, 0, 0, 0, 0, 0, 0];
    for (const s of allSessions) secs[new Date(s.ts).getDay()] += s.dur;
    return names.map((name, i) => ({ name, minutes: Math.round(secs[i] / 60) }));
  }, [allSessions]);

  // ---- Session log pagination ----
  const totalLogPages = Math.max(1, Math.ceil(allSessions.length / itemsPerPage));
  const safePage = Math.min(logPage, totalLogPages - 1);
  const paginatedLogs = useMemo(
    () => allSessions.slice(safePage * itemsPerPage, safePage * itemsPerPage + itemsPerPage),
    [allSessions, safePage],
  );

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
        {/* Study time over range */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-sm font-bold">
                  <TrendingUp className="h-4 w-4 text-cyan-500" />
                  Study time
                </CardTitle>
                <CardDescription className="text-xs font-medium">
                  {fmtDurationLong(o.seconds)} total · {Math.round(avgDaily)} min/day avg
                </CardDescription>
              </div>
              <ToggleGroup
                type="single"
                value={range}
                onValueChange={(v) => v && setRange(v)}
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="7" className="text-xs font-semibold">7d</ToggleGroupItem>
                <ToggleGroupItem value="30" className="text-xs font-semibold">30d</ToggleGroupItem>
                <ToggleGroupItem value="60" className="text-xs font-semibold">60d</ToggleGroupItem>
                <ToggleGroupItem value="90" className="text-xs font-semibold">90d</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {hasAnyTime ? (
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={xInterval} />
                    <YAxis hide />
                    <RTooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v} min`, "Focus"]} />
                    <Area type="monotone" dataKey="minutes" stroke="#06b6d4" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} fillOpacity={1} fill="url(#areaGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart text="No study time logged yet. Start a focus timer on any topic." />
            )}
          </CardContent>
        </Card>

        {/* Cumulative completions */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Target className="h-4 w-4 text-emerald-500" />
              Topics completed over time
            </CardTitle>
            <CardDescription className="text-xs font-medium">
              {o.done} completed · {fmtPct(o.pct)} of {o.total}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {cumulativeData.length > 0 ? (
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cumulativeData} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={cumulativeData.length > 7 ? Math.ceil(cumulativeData.length / 7) : 0} />
                    <YAxis tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={30} allowDecimals={false} />
                    <RTooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}`, "Completed"]} />
                    <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart text="Mark topics as done to chart your progress over time." />
            )}
          </CardContent>
        </Card>

        {/* Weekly routine */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Calendar className="h-4 w-4 text-amber-500" />
              Weekly routine
            </CardTitle>
            <CardDescription className="text-xs font-medium">Focus minutes by day of week</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {hasAnyTime ? (
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weekdayData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={34} tickFormatter={(v) => `${v}m`} />
                    <RTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "var(--muted)", opacity: 0.2 }} formatter={(v) => [fmtDuration(Number(v) * 60), "Focus"]} />
                    <Bar dataKey="minutes" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={38} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart text="Log a few sessions to reveal your weekly rhythm." />
            )}
          </CardContent>
        </Card>

        {/* Hourly focus pattern */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Clock className="h-4 w-4 text-violet-500" />
              Time-of-day pattern
            </CardTitle>
            <CardDescription className="text-xs font-medium">When you focus best</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {hasAnyTime ? (
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={34} tickFormatter={(v) => `${v}m`} />
                    <RTooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "var(--muted)", opacity: 0.2 }} formatter={(v) => [fmtDuration(Number(v) * 60), "Focus"]} />
                    <Bar dataKey="minutes" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyChart text="Your peak focus hours will appear here." />
            )}
          </CardContent>
        </Card>

        {/* Difficulty donut */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <PieIcon className="h-4 w-4 text-rose-500" />
              Difficulty breakdown
            </CardTitle>
            <CardDescription className="text-xs font-medium">Solved DSA topics by difficulty</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {diffTotalTracked === 0 || totalCompleted === 0 ? (
              <EmptyChart text="Complete some difficulty-tagged DSA topics to see this." />
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
                <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={diffPie} dataKey="value" nameKey="name" innerRadius={54} outerRadius={76} paddingAngle={3}>
                        {diffPie.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <RTooltip contentStyle={TOOLTIP_STYLE} formatter={(v, _n, p) => [`${v} / ${p?.payload?.total ?? 0}`, String(p?.payload?.name ?? "")]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black tabular-nums">{totalCompleted}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Solved</span>
                  </div>
                </div>
                <div className="w-full flex-1 space-y-2 sm:w-auto">
                  {diffPie.map((d) => (
                    <div key={d.name} className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors hover:bg-muted/40">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="flex-1 text-xs font-semibold">{d.name}</span>
                      <span className="text-xs font-black tabular-nums">{d.value}</span>
                      <span className="text-[10px] font-medium text-muted-foreground">/ {d.total}</span>
                      <span className="w-10 text-right text-xs font-bold text-muted-foreground">
                        {d.total ? fmtPct(d.value / d.total) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Focus by track */}
        <Card className="premium-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Clock className="h-4 w-4 text-cyan-500" />
              Focus by track
            </CardTitle>
            <CardDescription className="text-xs font-medium">Study time spent per subject</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {byTrack.length === 0 ? (
              <EmptyChart text="Study a topic to see per-track time." />
            ) : (
              <div className="w-full" style={{ height: Math.max(176, byTrack.length * 34) }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byTrack} layout="vertical" margin={{ top: 0, right: 16, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}m`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={52} />
                    <RTooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v) => [fmtDuration(Number(v) * 60), "Time"]}
                      labelFormatter={(_l, p) => (p && p[0]?.payload?.fullName) || ""}
                    />
                    <Bar dataKey="minutes" radius={[0, 4, 4, 0]} maxBarSize={26}>
                      {byTrack.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Session history */}
      <Card className="premium-card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-bold">
              <Timer className="h-4 w-4 text-violet-500" />
              Focus session history
            </CardTitle>
            <CardDescription className="text-xs font-medium">Every completed focus session</CardDescription>
          </div>
          {totalLogPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={safePage === 0}
                onClick={() => setLogPage((p) => Math.max(0, p - 1))}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border bg-card text-muted-foreground hover:bg-muted disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] font-bold text-muted-foreground">
                {safePage + 1} / {totalLogPages}
              </span>
              <button
                disabled={safePage >= totalLogPages - 1}
                onClick={() => setLogPage((p) => Math.min(totalLogPages - 1, p + 1))}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border bg-card text-muted-foreground hover:bg-muted disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {allSessions.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted-foreground">
              No focus sessions recorded yet. Start a timer on any topic to begin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border font-semibold text-muted-foreground">
                    <th className="py-2.5 pr-4">Topic</th>
                    <th className="px-4 py-2.5">Track</th>
                    <th className="px-4 py-2.5 text-right">Duration</th>
                    <th className="py-2.5 pl-4 text-right">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginatedLogs.map((log, i) => {
                    const sub = SUBJECT_MAP[log.subjectId];
                    return (
                      <tr key={`${log.qid}-${log.ts}-${i}`} className="transition-colors hover:bg-muted/40">
                        <td className="max-w-[200px] truncate py-3 pr-4 font-semibold text-foreground">{log.topicName}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-bold"
                            style={{
                              backgroundColor: sub ? `color-mix(in oklch, ${sub.color} 12%, transparent)` : "var(--muted)",
                              color: sub?.color ?? "var(--muted-foreground)",
                            }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sub?.color ?? "var(--muted-foreground)" }} />
                            {sub?.name ?? log.subjectId}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-muted-foreground">{fmtDuration(log.dur)}</td>
                        <td className="py-3 pl-4 text-right font-medium text-muted-foreground">
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

function localDateKey(ts: number): string {
  const d = new Date(ts);
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function MiniStat({
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
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`, color: accent }}
          >
            {icon}
          </span>
          <span className="text-[11px] font-bold">{label}</span>
        </div>
        <div className="mt-2 text-xl font-black tracking-tight tabular-nums">{value}</div>
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
