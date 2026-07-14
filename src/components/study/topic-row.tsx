"use client";

import * as React from "react";
import { Check, Star, Play, Square, ExternalLink, StickyNote, X } from "@/lib/icons";
import { useStudyStore } from "@/lib/store";
import { ITEM_INDEX, SUBJECT_MAP } from "@/lib/curriculum";
import type { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";
import { fmtDuration } from "@/lib/format";
import { DifficultyBadge } from "./difficulty-badge";
import { NotesButton } from "./notes-viewer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface TopicRowProps {
  topic: Topic;
  /** show the section name (used in search results / up-next). */
  showSection?: boolean;
}

export function TopicRow({ topic, showSection }: TopicRowProps) {
  const progress = useStudyStore((s) => s.progress[topic.qid]);
  const activeTimer = useStudyStore((s) => s.activeTimer);
  const toggleDone = useStudyStore((s) => s.toggleDone);
  const toggleStar = useStudyStore((s) => s.toggleStar);
  const setNotes = useStudyStore((s) => s.setNotes);
  const startTimer = useStudyStore((s) => s.startTimer);
  const stopTimer = useStudyStore((s) => s.stopTimer);
  const stopAndComplete = useStudyStore((s) => s.stopAndComplete);

  const [notesOpen, setNotesOpen] = React.useState(false);
  const [localNotes, setLocalNotes] = React.useState("");

  React.useEffect(() => {
    if (notesOpen) {
      setLocalNotes(progress?.notes ?? "");
    }
  }, [notesOpen, progress?.notes]);

  const subject = SUBJECT_MAP[topic.subjectId];
  const status = progress?.status ?? "todo";
  const isDone = status === "done";
  const isStarred = !!progress?.starred;
  const seconds = progress?.seconds ?? 0;
  const isRunning = activeTimer?.qid === topic.qid;

  const handleCheck = () => {
    if (isRunning) stopAndComplete();
    else toggleDone(topic.qid);
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-2 rounded-lg border border-transparent px-2 py-2 transition-colors hover:bg-muted/50",
        isDone && "opacity-70",
        isRunning && "bg-amber-500/5 ring-1 ring-amber-500/30",
      )}
    >
      {/* checkbox */}
      <button
        onClick={handleCheck}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
          isDone
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-input hover:border-emerald-500/60",
        )}
        aria-label={isDone ? "Mark as not done" : "Mark as done"}
      >
        {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </button>

      {/* main content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm leading-snug",
              isDone && "text-muted-foreground line-through",
            )}
          >
            {topic.name}
          </span>
          {topic.difficulty && <DifficultyBadge difficulty={topic.difficulty} />}
          {showSection && subject && (
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: `color-mix(in oklch, ${subject.color} 15%, transparent)`,
                color: subject.color,
              }}
            >
              {subject.short}
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          {seconds > 0 && <span>{fmtDuration(seconds)}</span>}
          {status === "doing" && <span className="text-amber-500">· in progress</span>}
          {status === "revisit" && <span className="text-violet-500">· revisit</span>}
          {progress?.notes && <span>· has notes</span>}
          {isRunning && <span className="font-medium text-amber-500">· running</span>}
        </div>

        {/* notes editor */}
        {notesOpen && (
          <div className="mt-2 st-fade-in space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground">My Notes</span>
              <button
                onClick={() => setNotesOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close notes"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <Textarea
              autoFocus
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Jot down key points, code snippets, or doubts…"
              className="min-h-[80px] text-xs font-sans"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className="h-6 px-2.5 text-[10px] font-semibold"
                onClick={() => {
                  setLocalNotes("");
                  setNotes(topic.qid, "");
                  toast.success("Notes cleared");
                }}
              >
                Clear
              </Button>
              <Button
                className="h-6 px-2.5 text-[10px] font-semibold"
                onClick={() => {
                  setNotes(topic.qid, localNotes);
                  toast.success("Notes saved");
                  setNotesOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* actions */}
      <div className="flex shrink-0 items-center gap-0.5">
        <TooltipProvider delayDuration={300}>
          <NotesButton topic={topic} />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setNotesOpen((o) => !o)}
                aria-label="Toggle my notes"
              >
                <StickyNote className={cn("h-3.5 w-3.5", notesOpen && "text-primary")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>My notes</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => toggleStar(topic.qid)}
                aria-label={isStarred ? "Unstar" : "Star to revisit"}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5",
                    isStarred && "fill-amber-400 text-amber-400",
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isStarred ? "Starred" : "Star to revisit"}</TooltipContent>
          </Tooltip>

          {subject && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  asChild
                >
                  <a
                    href={subject.search(topic.name, topic.sectionName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resource"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open resource</TooltipContent>
            </Tooltip>
          )}

          {isRunning ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-amber-500"
                    onClick={() => stopTimer()}
                    aria-label="Stop timer (save time)"
                  >
                    <Square className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Stop & save</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    className="h-7 gap-1 bg-emerald-600 px-2 text-xs hover:bg-emerald-700"
                    onClick={() => stopAndComplete()}
                  >
                    <Check className="h-3.5 w-3.5" /> Done
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Stop & mark complete</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => startTimer(topic.qid)}
                  aria-label="Start timer"
                >
                  <Play className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Start focus timer</TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    </div>
  );
}

/** Lightweight read-only version used in compact lists. */
export function TopicMini({ qid }: { qid: string }) {
  const topic = ITEM_INDEX[qid];
  if (!topic) return null;
  return <TopicRow topic={topic} showSection />;
}
