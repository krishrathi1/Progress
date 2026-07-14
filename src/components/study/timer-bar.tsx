"use client";

import * as React from "react";
import { Play, Square, Check, X, Timer as TimerIcon } from "lucide-react";
import { useStudyStore } from "@/lib/store";
import { ITEM_INDEX, SUBJECT_MAP } from "@/lib/curriculum";
import { useActiveTimerTick } from "./use-timer-tick";
import { fmtClock, fmtDuration } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function TimerBar() {
  const activeTimer = useStudyStore((s) => s.activeTimer);
  const stopTimer = useStudyStore((s) => s.stopTimer);
  const stopAndComplete = useStudyStore((s) => s.stopAndComplete);
  const elapsed = useActiveTimerTick();

  // pomodoro phase handling
  React.useEffect(() => {
    if (!activeTimer || activeTimer.mode !== "pomodoro" || !activeTimer.endsAt) return;
    const remaining = activeTimer.endsAt - Date.now();
    if (remaining <= 0) {
      useStudyStore.getState().extendPomodoro();
      return;
    }
    const id = setTimeout(() => {
      const phase = useStudyStore.getState().activeTimer?.phase;
      useStudyStore.getState().extendPomodoro();
      if (phase === "focus") {
        toast.success("Focus session done! Time for a break.");
      } else {
        toast.info("Break over — ready for another focus session?");
      }
    }, remaining);
    return () => clearTimeout(id);
  }, [activeTimer]);

  if (!activeTimer) return null;

  const topic = ITEM_INDEX[activeTimer.qid];
  const subject = topic ? SUBJECT_MAP[topic.subjectId] : undefined;
  const isPomo = activeTimer.mode === "pomodoro";
  const pomoRemaining =
    isPomo && activeTimer.endsAt
      ? Math.max(0, activeTimer.endsAt - Date.now())
      : 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-3 rounded-xl border bg-card/95 p-2.5 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80">
        {/* status dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
        </span>

        {/* icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: subject
              ? `color-mix(in oklch, ${subject.color} 18%, transparent)`
              : "var(--muted)",
            color: subject?.color ?? "var(--foreground)",
          }}
        >
          <TimerIcon className="h-4 w-4" />
        </div>

        {/* topic + clock */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-xs font-medium">{topic?.name ?? "Topic"}</span>
            {isPomo && (
              <span className="rounded bg-violet-500/15 px-1 py-0.5 text-[9px] font-bold uppercase text-violet-500">
                {activeTimer.phase}
              </span>
            )}
          </div>
          <div className="font-mono text-sm font-semibold tabular-nums tracking-tight">
            {isPomo ? fmtClock(Math.floor(pomoRemaining / 1000)) : fmtClock(elapsed)}
            <span className="ml-2 text-[10px] font-normal text-muted-foreground">
              {isPomo ? "remaining" : `· ${fmtDuration(elapsed)} total`}
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              const e = stopTimer();
              toast.success(`Saved ${fmtDuration(e)} to ${topic?.name ?? "topic"}`);
            }}
            title="Stop & save"
            aria-label="Stop and save"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => {
              stopAndComplete();
              toast.success(`Completed: ${topic?.name ?? "topic"}`);
            }}
          >
            <Check className="h-4 w-4" />
            <span className="hidden sm:inline">Done</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => {
              stopTimer();
              toast("Timer discarded");
            }}
            title="Discard"
            aria-label="Discard timer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Inline mini-timer pill shown in the header on mobile. */
export function TimerPill() {
  const activeTimer = useStudyStore((s) => s.activeTimer);
  const elapsed = useActiveTimerTick();
  if (!activeTimer) return null;
  return (
    <div className={cn("flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400")}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
      </span>
      <span className="font-mono tabular-nums">{fmtClock(elapsed)}</span>
    </div>
  );
}
