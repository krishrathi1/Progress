import { dsaNotes } from "./dsa";
import { theoryNotes } from "./theory";

/** URL/lookup-safe slug of a topic name. */
export function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Merge every subject's notes into one registry keyed by `${subjectId}:${slug}`.
const REGISTRY: Record<string, string> = {};
for (const [s, md] of Object.entries(dsaNotes)) REGISTRY[`dsa:${s}`] = md.trim();
for (const [subjectId, map] of Object.entries(theoryNotes)) {
  for (const [s, md] of Object.entries(map)) REGISTRY[`${subjectId}:${s}`] = md.trim();
}

type TopicLike = { subjectId: string; name: string };

export function noteKey(topic: TopicLike): string {
  return `${topic.subjectId}:${slug(topic.name)}`;
}

/** Returns the markdown note for a topic, or null if none is written yet. */
export function getNote(topic: TopicLike): string | null {
  return REGISTRY[noteKey(topic)] ?? null;
}

export function hasNote(topic: TopicLike): boolean {
  return noteKey(topic) in REGISTRY;
}

/** Total notes written (used for progress/status displays). */
export const NOTE_COUNT = Object.keys(REGISTRY).length;
