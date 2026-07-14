"use client";

import { useMemo } from "react";
import { useStudyStore } from "@/lib/store";
import { todayKey } from "@/lib/format";
import { cn } from "@/lib/utils";

const WEEKS = 26;

function heatColor(seconds: number): string {
  // 4 intensity levels
  if (seconds <= 0) return "var(--muted)";
  if (seconds < 1200) return "color-mix(in oklch, #f59e0b 35%, var(--muted))"; // <20m
  if (seconds < 3600) return "color-mix(in oklch, #f59e0b 60%, transparent)"; // 20-60m
  if (seconds < 7200) return "color-mix(in oklch, #f59e0b 80%, transparent)"; // 1-2h
  return "#f59e0b"; // 2h+
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function Heatmap() {
  const daily = useStudyStore((s) => s.daily);

  const grid = useMemo(() => {
    // Build columns = weeks, rows = days (Sun..Sat). Align so the last column is this week.
    const today = new Date();
    const todayDow = today.getDay();
    const totalDays = WEEKS * 7;
    const startOffset = totalDays - 1 - todayDow; // last Sunday is the bottom-right column start
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - startOffset,
    );

    const cols: { date: string; seconds: number; isToday: boolean }[][] = [];
    const cur = new Date(start);
    for (let w = 0; w < WEEKS; w++) {
      const col: { date: string; seconds: number; isToday: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const key = todayKey(cur.getTime());
        col.push({
          date: key,
          seconds: daily[key] || 0,
          isToday: key === todayKey(),
        });
        cur.setDate(cur.getDate() + 1);
      }
      cols.push(col);
    }
    return cols;
  }, [daily]);

  const monthLabels = useMemo(() => {
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    grid.forEach((col, ci) => {
      const m = new Date(col[0].date).getMonth();
      if (m !== lastMonth) {
        labels.push({ col: ci, label: MONTHS[m] });
        lastMonth = m;
      }
    });
    return labels;
  }, [grid]);

  const todayKeyStr = todayKey();

  return (
    <div className="w-full">
      {/* month labels — aligned with the week columns (offset matches weekday gutter) */}
      <div className="mb-1.5 flex gap-[3px] pl-[22px] text-[10px] text-muted-foreground">
        {grid.map((_col, ci) => {
          const lbl = monthLabels.find((m) => m.col === ci);
          return (
            <div key={ci} className="min-w-0 flex-1 truncate text-left">
              {lbl ? lbl.label : ""}
            </div>
          );
        })}
      </div>

      <div className="flex gap-[3px]">
        {/* weekday labels */}
        <div className="flex w-[18px] shrink-0 flex-col justify-between py-[1px] text-[9px] leading-none text-muted-foreground">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* cells — each week column is fluid (flex-1) so the grid fills the full width */}
        <div className="flex flex-1 gap-[3px]">
          {grid.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-[3px]">
              {col.map((cell, ri) => (
                <div
                  key={ri}
                  className={cn(
                    "aspect-square w-full rounded-[3px] border border-black/5 dark:border-white/5",
                    cell.isToday && "heat-today ring-1 ring-amber-500/50",
                  )}
                  style={{
                    backgroundColor: heatColor(cell.seconds),
                  }}
                  title={`${cell.date}: ${cell.seconds > 0 ? Math.round(cell.seconds / 60) + " min" : "no activity"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="mt-2.5 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0, 1200, 3600, 7200, 10800].map((s, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-[3px] border border-black/5 dark:border-white/5"
            style={{ backgroundColor: heatColor(s) }}
          />
        ))}
        <span>More</span>
      </div>

      {/* screen-reader summary */}
      <span className="sr-only">
        Activity heatmap for the last 26 weeks. Today is {todayKeyStr}.
      </span>
    </div>
  );
}
