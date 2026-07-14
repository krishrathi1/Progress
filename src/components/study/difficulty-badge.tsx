"use client";

import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/types";

const DIFF_CLASS: Record<Difficulty, string> = {
  Easy: "diff-easy",
  Medium: "diff-medium",
  Hard: "diff-hard",
};

const DIFF_LABEL: Record<Difficulty, string> = {
  Easy: "E",
  Medium: "M",
  Hard: "H",
};

export function DifficultyBadge({
  difficulty,
  className,
  full = false,
}: {
  difficulty: Difficulty | null;
  className?: string;
  full?: boolean;
}) {
  if (!difficulty) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide leading-none",
        DIFF_CLASS[difficulty],
        className,
      )}
      title={difficulty}
    >
      {full ? difficulty : DIFF_LABEL[difficulty]}
    </span>
  );
}
