/**
 * Core domain types for StudyTracker.
 *
 * The curriculum is a static, normalized model of every study track,
 * section and topic. Progress is a separate, persisted record keyed by
 * a stable topic id (`qid` = `${subjectId}.${sectionIdx}.${itemIdx}`).
 */

export type Difficulty = "Easy" | "Medium" | "Hard";

export type TopicStatus = "todo" | "doing" | "done" | "revisit";

/** A raw curriculum item is either a plain name or [name, difficulty]. */
export type RawItem = string | [string, Difficulty];

/** A normalized topic record living inside a section. */
export interface Topic {
  qid: string;
  name: string;
  difficulty: Difficulty | null;
  subjectId: string;
  sectionIdx: number;
  sectionName: string;
}

/**
 * A curriculum section. The `items` field holds the *raw* curriculum items
 * (either a plain topic name or `[name, difficulty]`). The
 * `curriculum/index.ts` module normalizes these into `Topic` records stored
 * in `ITEM_INDEX` / `ALL_ITEMS`; the raw `items` array is left intact so the
 * source-of-truth curriculum data stays immutable.
 */
export interface Section {
  name: string;
  items: RawItem[];
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  color: string;
  kind: "dsa" | "topic";
  desc: string;
  source: string;
  /** Builds an external search/resource URL for a topic name. */
  search: (name: string) => string;
  sections: Section[];
  /** Computed total topic count (populated at load). */
  _total: number;
}

/** Per-topic persisted progress. */
export interface TopicProgress {
  status: TopicStatus;
  seconds: number;
  sessions: { date: string; dur: number; ts: number }[];
  notes: string;
  starred: boolean;
  completedAt: number | null;
}

/** The single active timer (only one runs at a time). */
export interface ActiveTimer {
  qid: string;
  start: number;
  mode: "stopwatch" | "pomodoro";
  /** For pomodoro mode: phase + planned end timestamp. */
  phase?: "focus" | "break";
  endsAt?: number;
}

export interface Settings {
  dailyGoalMin: number;
  pomoFocus: number;
  pomoBreak: number;
  celebrate: boolean;
}

export interface Profile {
  avatar: string;
  customTitle: string;
  motto: string;
}

export interface PersistedState {
  progress: Record<string, TopicProgress>;
  daily: Record<string, number>;
  activeTimer: ActiveTimer | null;
  settings: Settings;
  seenAch: string[];
  meta: { created: number };
  profile?: Profile;
}

/* ---------------- Derived / computed types ---------------- */

export interface DifficultyStat {
  total: number;
  done: number;
}

export interface SubjectStats {
  total: number;
  done: number;
  doing: number;
  revisit: number;
  starred: number;
  seconds: number;
  diff: Record<Difficulty, DifficultyStat>;
  pct: number;
}

export interface SectionStats {
  total: number;
  done: number;
  seconds: number;
  pct: number;
}

export interface OverallStats {
  total: number;
  done: number;
  doing: number;
  seconds: number;
  starred: number;
  diff: Record<Difficulty, DifficultyStat>;
  bySubject: (SubjectStats & { id: string; name: string; short: string; color: string })[];
  tracksStarted: number;
  tracksDone: number;
  pct: number;
}

export interface DayPoint {
  date: string;
  seconds: number;
}

export interface UpNextItem extends Topic {
  seconds: number;
  status: TopicStatus;
  last: number;
}

export interface ActivityItem {
  qid: string;
  ts: number;
  dur: number;
  name: string | undefined;
  subjectId: string | undefined;
}

export interface Gamification {
  xp: number;
  level: number;
  floor: number;
  next: number;
  inLevel: number;
  span: number;
  title: string;
  pct: number;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tier: "bronze" | "silver" | "gold";
  unlocked: boolean;
  progress: number;
}

export type ViewId = string; // "dashboard" | "analytics" | "achievements" | "data" | subjectId
