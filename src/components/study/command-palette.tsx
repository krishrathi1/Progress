"use client";

import * as React from "react";
import { Search, Hash, ExternalLink, ArrowRight } from "@/lib/icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ALL_ITEMS, CURRICULUM, SUBJECT_MAP } from "@/lib/curriculum";
import { useStudyStore } from "@/lib/store";
import type { Route } from "./use-hash-route";
import { DifficultyBadge } from "./difficulty-badge";
import { fmtDuration } from "@/lib/format";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  navigate: (r: Route) => void;
  startTimer: (qid: string) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  navigate,
  startTimer,
}: CommandPaletteProps) {
  const progress = useStudyStore((s) => s.progress);
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_ITEMS.filter((t) => t.name.toLowerCase().includes(q)).slice(0, 60);
  }, [query]);

  const trackResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CURRICULUM.filter(
      (s) => s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  const go = (r: Route) => {
    onOpenChange(false);
    setQuery("");
    navigate(r);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search 1000+ topics across all tracks…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="st-scroll">
        <CommandEmpty>
          {query ? `No topics match "${query}".` : "Start typing to search…"}
        </CommandEmpty>

        {trackResults.length > 0 && (
          <CommandGroup heading="Tracks">
            {trackResults.map((sub) => (
              <CommandItem
                key={sub.id}
                value={`track-${sub.id}-${sub.name}`}
                onSelect={() => go({ view: "track", subjectId: sub.id })}
              >
                <Hash className="h-4 w-4 text-muted-foreground" style={{ color: sub.color }} />
                <span className="flex-1">{sub.name}</span>
                <span className="text-xs text-muted-foreground">{sub.short}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {results.length > 0 && (
          <CommandGroup heading={`Topics (${results.length}${results.length === 60 ? "+" : ""})`}>
            {results.map((t) => {
              const sub = SUBJECT_MAP[t.subjectId];
              const p = progress[t.qid];
              return (
                <CommandItem
                  key={t.qid}
                  value={`${t.qid}-${t.name}`}
                  onSelect={() => {
                    startTimer(t.qid);
                    go({ view: "track", subjectId: t.subjectId });
                  }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: sub?.color }}
                  />
                  <span className="flex-1 truncate">{t.name}</span>
                  {t.difficulty && <DifficultyBadge difficulty={t.difficulty} />}
                  {p?.seconds ? (
                    <span className="text-[10px] text-muted-foreground">
                      {fmtDuration(p.seconds)}
                    </span>
                  ) : null}
                  {p?.status === "done" && (
                    <span className="rounded bg-emerald-500/15 px-1 text-[10px] font-medium text-emerald-600">
                      done
                    </span>
                  )}
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {!query && (
          <CommandGroup heading="Quick actions">
            <CommandItem value="go-dashboard" onSelect={() => go({ view: "dashboard" })}>
              <Search className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </CommandItem>
            <CommandItem value="go-analytics" onSelect={() => go({ view: "analytics" })}>
              <ExternalLink className="h-4 w-4" />
              <span>Open Analytics</span>
            </CommandItem>
            <CommandItem value="go-achievements" onSelect={() => go({ view: "achievements" })}>
              <ExternalLink className="h-4 w-4" />
              <span>View Achievements</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
