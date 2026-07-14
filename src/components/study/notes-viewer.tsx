"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BookOpen, ExternalLink } from "@/lib/icons";
import type { Topic } from "@/lib/types";
import { SUBJECT_MAP } from "@/lib/curriculum";
import { getNote, hasNote } from "@/lib/notes";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "./difficulty-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/** Book icon that opens a rich learning-notes dialog for a topic. */
export function NotesButton({ topic }: { topic: Topic }) {
  const [open, setOpen] = React.useState(false);
  const available = hasNote(topic);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", available && "text-indigo-500")}
            onClick={() => setOpen(true)}
            aria-label="Open notes"
          >
            <BookOpen className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{available ? "Read notes" : "Notes (soon)"}</TooltipContent>
      </Tooltip>
      {open && <NotesDialog topic={topic} open={open} onOpenChange={setOpen} />}
    </>
  );
}

function NotesDialog({
  topic,
  open,
  onOpenChange,
}: {
  topic: Topic;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const subject = SUBJECT_MAP[topic.subjectId];
  const md = getNote(topic);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <DialogHeader className="space-y-0 border-b px-6 py-4">
          <div className="flex items-center gap-2">
            {subject && (
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold"
                style={{
                  backgroundColor: `color-mix(in oklch, ${subject.color} 15%, transparent)`,
                  color: subject.color,
                }}
              >
                {subject.short}
              </span>
            )}
            {topic.difficulty && <DifficultyBadge difficulty={topic.difficulty} />}
          </div>
          <DialogTitle className="font-display pt-1.5 text-lg">{topic.name}</DialogTitle>
        </DialogHeader>

        <div className="st-scroll max-h-[calc(88vh-92px)] overflow-y-auto px-6 py-5">
          {md ? (
            <article className="notes-prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    if (match) {
                      return (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={oneDark}
                          PreTag="div"
                          customStyle={{
                            margin: "0.75rem 0",
                            borderRadius: "0.6rem",
                            fontSize: "0.82rem",
                            padding: "0.9rem 1rem",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      );
                    }
                    return (
                      <code className="notes-inline-code" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {md}
              </ReactMarkdown>
            </article>
          ) : (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <p className="font-semibold">Detailed notes coming soon</p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                  A full explanation for <span className="font-medium text-foreground">{topic.name}</span> is being written. In the meantime, open the reference article:
                </p>
              </div>
              {subject && (
                <Button asChild variant="outline" size="sm" className="mt-1">
                  <a href={subject.search(topic.name)} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Open on {subject.source}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
