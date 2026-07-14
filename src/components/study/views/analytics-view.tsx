"use client";

import * as React from "react";
import {
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
  Legend,
} from "recharts";
import { Clock, BarChart3, PieChart as PieIcon, TrendingUp, Activity } from "lucide-react";
import {
  useStudyStore,
  overallStats,
  dailySeries,
  streak,
  longestStreak,
  activeDays,
  longestSession,
} from "@/lib/store";
import { CURRICULUM } from "@/lib/curriculum";
import { fmtDuration, fmtDurationLong, fmtPct, monthShort, weekdayShort } from "@/lib/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DIFF_COLORS: Record<string, string> = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

export function AnalyticsView() {
  useStudyStore((s) => s.progress);
  useStudyStore((s) => s.daily);

  const [range, setRange] = React.useState("30");
  const o = overallStats();
  const series = dailySeries(parseInt(range, 10));
  const curStreak = streak();
  const longest = longestStreak();
  const days = activeDays();
  const longestSess = longestSession();

  // time-by-track + topics-by-track
  const byTrack = o.bySubject
    .map((s) => ({
      name: s.short,
      fullName: s.name,
      color: s.color,
      seconds: s.seconds,
      done: s.done,
      total: s.total,
    }))
    .filter((s) => s.seconds > 0 || s.done > 0);

  const lineData = series.map((d) => {
    const date = new Date(d.date);
    return {
      date: d.date,
      label: `${monthShort(date)} ${date.getDate()}`,
      minutes: Math.round(d.seconds / 60),
      seconds: d.seconds,
    };
  });

  const diffPie = (["Easy", "Medium", "Hard"] as const)
    .map((k) => ({ name: k, value: o.diff[k].done, total: o.diff[k].total, color: DIFF_COLORS[k] }))
    .filter((d) => d.total > 0);

  const totalLineMinutes = lineData.reduce((a, b) => a + b.minutes, 0);
  const avgDaily = series.length ? totalLineMinutes / series.length : 0;

  return (
    <div className="st-fade-in space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat icon={<TrendingUp className="h-4 w-4" />} label="Current streak" value={`${curStreak} days`} accent="#f97316" />
        <MiniStat icon={<Activity className="h-4 w-4" />} label="Longest streak" value={`${longest} days`} accent="#ec4899" />
        <MiniStat icon={<Clock className="h-4 w-4" />} label="Longest session" value={fmtDuration(longestSess)} accent="#06b6d4" />
        <MiniStat icon={<BarChart3 className="h-4 w-4" />} label="Active days" value={`${days} days`} accent="#10b981" />
      </div>

      {/* Study time line chart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-cyan-500" />
                Study time
              </CardTitle>
              <CardDescription className="text-xs">
                {fmtDurationLong(o.seconds)} total · {Math.round(avgDaily)} min/day avg
              </CardDescription>
            </div>
            <ToggleGroup type="single" value={range} onValueChange={(v) => v && setRange(v)} variant="outline" size="sm">
              <ToggleGroupItem value="7" className="text-xs">7d</ToggleGroupItem>
              <ToggleGroupItem value="30" className="text-xs">30d</ToggleGroupItem>
              <ToggleGroupItem value="60" className="text-xs">60d</ToggleGroupItem>
              <ToggleGroupItem value="90" className="text-xs">90d</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={Math.ceil(lineData.length / 8)}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  width={36}
                />
                <RTooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v} min`, "Study time"]}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  fill="url(#lineGrad)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Difficulty donut */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <PieIcon className="h-4 w-4 text-amber-500" />
              Difficulty breakdown
            </CardTitle>
            <CardDescription className="text-xs">Solved problems by difficulty</CardDescription>
          </CardHeader>
          <CardContent>
            {o.diff.Easy.total + o.diff.Medium.total + o.diff.Hard.total === 0 ? (
              <EmptyChart text="No difficulty-tagged topics yet." />
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-48 w-48 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diffPie}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                      >
                        {diffPie.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <RTooltip
                        contentStyle={{
                          backgroundColor: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                        formatter={(v: number, _n, p) => [
                          `${v} / ${p?.payload?.total}`,
                          p?.payload?.name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {diffPie.map((d) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                      <span className="flex-1 text-sm">{d.name}</span>
                      <span className="text-sm font-medium tabular-nums">{d.value}</span>
                      <span className="text-xs text-muted-foreground">/ {d.total}</span>
                      <span className="w-10 text-right text-xs text-muted-foreground">
                        {d.total ? fmtPct(d.value / d.total) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time by track */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-cyan-500" />
              Time by track
            </CardTitle>
            <CardDescription className="text-xs">Where you spend your focus</CardDescription>
          </CardHeader>
          <CardContent>
            {byTrack.length === 0 ? (
              <EmptyChart text="Start the timer on a topic to see time by track." />
            ) : (
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={byTrack}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}m`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      width={48}
                    />
                    <RTooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [fmtDuration(v * 60), "Time"]}
                      labelFormatter={(_l, p) => p?.[0]?.payload?.fullName ?? ""}
                    />
                    <Bar dataKey={(d) => Math.round(d.seconds / 60)} name="minutes" radius={[0, 4, 4, 0]}>
                      {byTrack.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Topics completed by track */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-violet-500" />
            Topics completed by track
          </CardTitle>
          <CardDescription className="text-xs">{o.done}/{o.total} topics done overall ({fmtPct(o.pct)})</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5">
            {o.bySubject.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-14 shrink-0 text-xs font-medium">{s.short}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-muted">
                  <div
                    className="flex h-full items-center justify-end rounded-md px-2 text-[10px] font-bold text-white transition-all"
                    style={{
                      width: `${Math.max(2, s.pct * 100)}%`,
                      backgroundColor: s.color,
                      minWidth: s.done > 0 ? "1.5rem" : 0,
                    }}
                  >
                    {s.done > 0 ? s.done : ""}
                  </div>
                </div>
                <span className="w-16 shrink-0 text-right text-[11px] text-muted-foreground tabular-nums">
                  {fmtPct(s.pct)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`, color: accent }}
          >
            {icon}
          </span>
          <span className="text-[11px]">{label}</span>
        </div>
        <div className="mt-2 text-xl font-bold tabular-nums">{value}</div>
      </CardContent>
    </Card>
  );
}

function EmptyChart({ text }: { text: string }) {
  return (
    <div className="flex h-48 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
      {text}
    </div>
  );
}
