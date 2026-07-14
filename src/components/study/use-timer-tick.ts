"use client";

import { useEffect, useState } from "react";
import { useStudyStore } from "@/lib/store";

/**
 * Re-renders every second while a timer is running, returning elapsed seconds.
 * Returns 0 (and does not subscribe to an interval) when no timer is active.
 */
export function useActiveTimerTick(): number {
  const activeTimer = useStudyStore((s) => s.activeTimer);
  const hasTimer = !!activeTimer;
  const start = activeTimer?.start ?? 0;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!hasTimer) return;
    const update = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [hasTimer, start]);

  return hasTimer ? elapsed : 0;
}

/** Re-renders every `ms` (default 30s) so "time ago" labels stay fresh. */
export function useInterval(ms: number): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}
