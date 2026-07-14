import type { RawItem, Section, Subject, Topic } from "@/lib/types";
import { dsaTrack } from "./dsa";
import { javaTrack } from "./java";
import { oopTrack, dbmsTrack, osTrack, cnTrack } from "./cs-core";
import { sdTrack, awsTrack, dockerTrack, sqlTrack } from "./system-devops";

/** All study tracks in display order. */
export const CURRICULUM: Subject[] = [
  dsaTrack,
  javaTrack,
  oopTrack,
  dbmsTrack,
  osTrack,
  cnTrack,
  sdTrack,
  awsTrack,
  dockerTrack,
  sqlTrack,
];

/* ---- Build a normalized, indexed model from the raw curriculum ---- */

export const SUBJECT_MAP: Record<string, Subject> = {};
export const ITEM_INDEX: Record<string, Topic> = {};
export const ALL_ITEMS: Topic[] = [];

CURRICULUM.forEach((sub) => {
  SUBJECT_MAP[sub.id] = sub;
  sub._total = 0;
  sub.sections.forEach((sec, si) => {
    sec.items.forEach((raw: RawItem, ii: number) => {
      const name = Array.isArray(raw) ? raw[0] : raw;
      const difficulty = Array.isArray(raw) ? raw[1] : null;
      const qid = `${sub.id}.${si}.${ii}`;
      const rec: Topic = {
        qid,
        name,
        difficulty,
        subjectId: sub.id,
        sectionIdx: si,
        sectionName: sec.name,
      };
      ITEM_INDEX[qid] = rec;
      ALL_ITEMS.push(rec);
      sub._total++;
    });
  });
});

/** Returns the normalized Topic list for a given subject + section index. */
export function sectionTopics(subId: string, si: number): Topic[] {
  const sub = SUBJECT_MAP[subId];
  if (!sub || !sub.sections[si]) return [];
  return sub.sections[si].items.map((_raw: RawItem, ii: number) =>
    ITEM_INDEX[`${subId}.${si}.${ii}`],
  );
}

/** Returns every Topic for a subject (across all sections). */
export function subjectTopics(subId: string): Topic[] {
  return ALL_ITEMS.filter((t) => t.subjectId === subId);
}

export type { Section, Subject, Topic };
