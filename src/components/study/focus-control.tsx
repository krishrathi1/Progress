"use client";

import * as React from "react";
import { Timer, Coffee, Play, Square, X } from "@/lib/icons";
import { useStudyStore, upNext } from "@/lib/store";
import { ITEM_INDEX } from "@/lib/curriculum";
import { useActiveTimerTick } from "./use-timer-tick";
import { fmtClock, fmtDuration } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/**
 * Header focus/break control. Lets the user start a Pomodoro focus session and
 * manage the focus <-> break cycle straight from the top nav bar.
 */
export function FocusControl() {
  const activeTimer = useStudyStore((s) => s.activeTimer);
  const startTimer = useStudyStore((s) => s.startTimer);
  const takeBreakNow = useStudyStore((s) => s.takeBreakNow);
  const backToFocus = useStudyStore((s) => s.backToFocus);
  const endBreak = useStudyStore((s) => s.endBreak);
  const stopTimer = useStudyStore((s) => s.stopTimer);
  const elapsed = useActiveTimerTick(); // re-renders every second while active

  // ---- Idle: offer to start a focus session ----
  if (!activeTimer) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-1.5"
        onClick={() => {
          const next = upNext(1)[0];
          if (!next) return;
          startTimer(next.qid, "pomodoro");
          toast.success(`Focus started · ${next.name}`, { description: "25-minute Pomodoro" });
        }}
        title="Start a focus session (Pomodoro)"
      >
        <Timer className="h-4 w-4 text-violet-500" />
        <span className="hidden font-semibold sm:inline">Focus</span>
      </Button>
    );
  }

  const topic = ITEM_INDEX[activeTimer.qid];
  const isPomo = activeTimer.mode === "pomodoro";
  const isBreak = isPomo && activeTimer.phase === "break";
  const remainMs = isPomo && activeTimer.endsAt ? Math.max(0, activeTimer.endsAt - Date.now()) : 0;
  const clock = isPomo ? fmtClock(Math.floor(remainMs / 1000)) : fmtClock(elapsed);

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border py-0.5 pl-2.5 pr-1",
        isBreak
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-violet-500/30 bg-violet-500/10",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 pr-1 text-xs font-bold tabular-nums",
          isBreak ? "text-emerald-600 dark:text-emerald-400" : "text-violet-600 dark:text-violet-400",
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", isBreak ? "bg-emerald-400" : "bg-violet-400")} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", isBreak ? "bg-emerald-500" : "bg-violet-500")} />
        </span>
        {isBreak ? <Coffee className="h-3.5 w-3.5" /> : <Timer className="h-3.5 w-3.5" />}
        <span className="font-mono">{clock}</span>
        <span className="hidden text-[10px] font-semibold uppercase opacity-70 md:inline">
          {isBreak ? "break" : isPomo ? "focus" : "timing"}
        </span>
      </span>

      {isBreak ? (
        <>
          <IconBtn title="Back to focus" onClick={() => { backToFocus(); toast.success("Back to focus 💪"); }}>
            <Play className="h-3.5 w-3.5" />
          </IconBtn>
          <IconBtn title="End break" onClick={() => { endBreak(); toast("Break ended"); }}>
            <X className="h-3.5 w-3.5" />
          </IconBtn>
        </>
      ) : (
        <>
          {isPomo && (
            <IconBtn title="Take a break now" onClick={() => { takeBreakNow(); toast.success("Break time ☕"); }}>
              <Coffee className="h-3.5 w-3.5" />
            </IconBtn>
          )}
          <IconBtn
            title="Stop & save"
            onClick={() => { const e = stopTimer(); toast.success(`Saved ${fmtDuration(e)}${topic ? ` to ${topic.name}` : ""}`); }}
          >
            <Square className="h-3.5 w-3.5" />
          </IconBtn>
        </>
      )}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-background/70 hover:text-foreground"
    >
      {children}
    </button>
  );
}
