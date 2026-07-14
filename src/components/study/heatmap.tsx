"use client";

import { useMemo, useState } from "react";
import { useStudyStore } from "@/lib/store";
import { todayKey } from "@/lib/format";
import { cn } from "@/lib/utils";

const WEEKS = 53;

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
  const meta = useStudyStore((s) => s.meta);
  const [selectedYear, setSelectedYear] = useState<string>("last-year");

  // Dynamically extract all years from the account creation year to the current year
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const createdTs = meta?.created || Date.now();
    const createdYear = new Date(createdTs).getFullYear();
    
    const years = new Set<number>();
    years.add(currentYear);
    
    // Populate all years from creation year to current year
    const startYear = Math.min(createdYear, currentYear);
    for (let yr = currentYear; yr >= startYear; yr--) {
      years.add(yr);
    }

    // Also include daily keys in case older data was imported
    Object.keys(daily).forEach((key) => {
      const yr = parseInt(key.split("-")[0], 10);
      if (!isNaN(yr)) years.add(yr);
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [daily, meta]);

  const grid = useMemo(() => {
    let start: Date;
    if (selectedYear === "last-year") {
      const today = new Date();
      const todayDow = today.getDay();
      const totalDays = WEEKS * 7;
      const startOffset = totalDays - 1 - todayDow; // last Sunday is the bottom-right column start
      start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - startOffset,
      );
    } else {
      const yearNum = parseInt(selectedYear, 10);
      const jan1 = new Date(yearNum, 0, 1);
      const jan1Dow = jan1.getDay();
      // Go back to the Sunday of that week to start the grid on Sunday
      start = new Date(yearNum, 0, 1 - jan1Dow);
    }

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
  }, [daily, selectedYear]);

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
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      {/* Left side: Heatmap grid + Legend */}
      <div className="min-w-0 flex-1">
        {/* Year status label */}
        <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
          {selectedYear === "last-year" ? "Last 365 Days" : `${selectedYear} Activity`}
        </div>

        <div className="w-full overflow-x-auto st-scroll pb-1">
          <div className="min-w-[760px] pr-1">
            {/* month labels — aligned precisely with week columns */}
          <div className="relative mb-1.5 h-4 text-[10px] text-muted-foreground select-none">
            {monthLabels.map((lbl) => {
              return (
                <span
                  key={lbl.col}
                  className="absolute text-left whitespace-nowrap"
                  style={{
                    left: `calc(22px + (${lbl.col} / ${WEEKS}) * (100% - 22px))`,
                  }}
                >
                  {lbl.label}
                </span>
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

              {/* cells — each week column is fluid */}
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
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center justify-between gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-[10px] text-muted-foreground">
            {selectedYear === "last-year" ? "Showing rolling contributions" : `Yearly overview for ${selectedYear}`}
          </span>
          <div className="flex items-center gap-1">
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
        </div>
      </div>

      {/* Right side: Year buttons sidebar */}
      <div className="flex flex-row gap-1.5 shrink-0 md:flex-col md:w-24 select-none">
        <button
          onClick={() => setSelectedYear("last-year")}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-semibold text-center md:text-left transition-all cursor-pointer whitespace-nowrap",
            selectedYear === "last-year"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          Last Year
        </button>
        {availableYears.map((yr) => (
          <button
            key={yr}
            onClick={() => setSelectedYear(String(yr))}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold text-center md:text-left transition-all cursor-pointer",
              selectedYear === String(yr)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {yr}
          </button>
        ))}
      </div>

      {/* screen-reader summary */}
      <span className="sr-only">
        Activity heatmap for the last {selectedYear === "last-year" ? "53 weeks" : `year ${selectedYear}`}. Today is {todayKeyStr}.
      </span>
    </div>
  );
}
