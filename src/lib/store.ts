"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ActiveTimer,
  PersistedState,
  Settings,
  TopicProgress,
  TopicStatus,
} from "@/lib/types";
import { CURRICULUM, ITEM_INDEX, SUBJECT_MAP } from "@/lib/curriculum";
import { todayKey } from "@/lib/format";

const LS_KEY = "studytracker.v3";

export const DEFAULT_SETTINGS: Settings = {
  dailyGoalMin: 120,
  pomoFocus: 25,
  pomoBreak: 5,
  celebrate: true,
};

const DEFAULT_STATE: Omit<PersistedState, "settings"> = {
  progress: {},
  daily: {},
  activeTimer: null,
  seenAch: [],
  meta: { created: Date.now() },
};

interface StudyStoreState extends PersistedState {
  /* ---- actions ---- */
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
  prog: (qid: string) => TopicProgress;
  setStatus: (qid: string, status: TopicStatus) => void;
  toggleDone: (qid: string) => void;
  toggleStar: (qid: string) => void;
  setNotes: (qid: string, text: string) => void;
  addTime: (qid: string, seconds: number, whenTs?: number) => void;
  markSectionDone: (subId: string, si: number) => void;
  startTimer: (qid: string, mode?: "stopwatch" | "pomodoro") => void;
  stopTimer: () => number;
  stopAndComplete: () => void;
  extendPomodoro: () => void;
  /** During a focus phase: log focus time and switch to a break. */
  takeBreakNow: () => void;
  /** During a break: return straight to a fresh focus phase (break not logged). */
  backToFocus: () => void;
  /** End an active break without logging it as study time. */
  endBreak: () => void;
  resetSubject: (subId: string) => void;
  resetAll: () => void;
  importData: (json: string) => void;
  exportData: () => string;
  _recompute: () => void;
}

function ensureProg(progress: Record<string, TopicProgress>, qid: string): TopicProgress {
  if (!progress[qid]) {
    progress[qid] = {
      status: "todo",
      seconds: 0,
      sessions: [],
      notes: "",
      starred: false,
      completedAt: null,
    };
  }
  return progress[qid];
}

export const useStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      ...structuredClone(DEFAULT_STATE),
      settings: { ...DEFAULT_SETTINGS },

      setSetting: (k, v) =>
        set((s) => ({ settings: { ...s.settings, [k]: v } })),

      prog: (qid) => ensureProg(get().progress, qid),

      setStatus: (qid, status) =>
        set((s) => {
          const p = ensureProg(s.progress, qid);
          p.status = status;
          if (status === "done") p.completedAt = p.completedAt || Date.now();
          else if (status !== "revisit") p.completedAt = null;
          return { progress: { ...s.progress } };
        }),

      toggleDone: (qid) => {
        const p = get().progress[qid];
        get().setStatus(qid, p && p.status === "done" ? "todo" : "done");
      },

      toggleStar: (qid) =>
        set((s) => {
          const p = ensureProg(s.progress, qid);
          p.starred = !p.starred;
          if (p.starred && p.status === "todo") p.status = "revisit";
          else if (!p.starred && p.status === "revisit") p.status = "todo";
          return { progress: { ...s.progress } };
        }),

      setNotes: (qid, text) =>
        set((s) => {
          const p = ensureProg(s.progress, qid);
          p.notes = text;
          return { progress: { ...s.progress } };
        }),

      addTime: (qid, seconds, whenTs) => {
        if (seconds <= 0) return;
        set((s) => {
          const p = ensureProg(s.progress, qid);
          p.seconds += seconds;
          const day = todayKey(whenTs);
          p.sessions.push({ date: day, dur: seconds, ts: whenTs || Date.now() });
          const daily = { ...s.daily };
          daily[day] = (daily[day] || 0) + seconds;
          if (p.status === "todo" || p.status === "revisit") p.status = "doing";
          return { progress: { ...s.progress }, daily };
        });
      },

      markSectionDone: (subId, si) =>
        set((s) => {
          const sub = SUBJECT_MAP[subId];
          if (!sub || !sub.sections[si]) return s;
          const progress = { ...s.progress };
          sub.sections[si].items.forEach((_raw, ii) => {
            const qid = `${subId}.${si}.${ii}`;
            const p = ensureProg(progress, qid);
            if (p.status !== "done") {
              p.status = "done";
              p.completedAt = p.completedAt || Date.now();
            }
          });
          return { progress };
        }),

      startTimer: (qid, mode = "stopwatch") => {
        // stopping any existing timer saves its elapsed time first
        if (get().activeTimer) get().stopTimer();
        const settings = get().settings;
        const now = Date.now();
        const activeTimer: ActiveTimer =
          mode === "pomodoro"
            ? {
                qid,
                start: now,
                mode,
                phase: "focus",
                endsAt: now + settings.pomoFocus * 60_000,
              }
            : { qid, start: now, mode };
        set((s) => {
          const p = ensureProg(s.progress, qid);
          if (p.status === "todo" || p.status === "revisit") p.status = "doing";
          return { activeTimer, progress: { ...s.progress } };
        });
      },

      stopTimer: () => {
        const t = get().activeTimer;
        if (!t) return 0;
        const elapsed = Math.round((Date.now() - t.start) / 1000);
        set({ activeTimer: null });
        if (elapsed > 0) get().addTime(t.qid, elapsed, t.start);
        return elapsed;
      },

      stopAndComplete: () => {
        const t = get().activeTimer;
        if (!t) return;
        const qid = t.qid;
        get().stopTimer();
        get().setStatus(qid, "done");
      },

      /** When a pomodoro phase elapses, log time and either start a break or stop. */
      extendPomodoro: () => {
        const t = get().activeTimer;
        if (!t || t.mode !== "pomodoro") return;
        const elapsed = Math.round((Date.now() - t.start) / 1000);
        if (elapsed > 0) get().addTime(t.qid, elapsed, t.start);
        const settings = get().settings;
        const now = Date.now();
        if (t.phase === "focus") {
          set({
            activeTimer: {
              qid: t.qid,
              start: now,
              mode: "pomodoro",
              phase: "break",
              endsAt: now + settings.pomoBreak * 60_000,
            },
          });
        } else {
          set({ activeTimer: null });
        }
      },

      takeBreakNow: () => {
        const t = get().activeTimer;
        if (t?.mode === "pomodoro" && t.phase === "focus") get().extendPomodoro();
      },

      backToFocus: () => {
        const t = get().activeTimer;
        if (!t) return;
        const now = Date.now();
        const settings = get().settings;
        // starting a fresh focus phase; a break in progress is intentionally not logged
        set({
          activeTimer: { qid: t.qid, start: now, mode: "pomodoro", phase: "focus", endsAt: now + settings.pomoFocus * 60_000 },
        });
      },

      endBreak: () => {
        const t = get().activeTimer;
        if (t && t.phase === "break") set({ activeTimer: null });
      },

      resetSubject: (subId) =>
        set((s) => {
          const sub = SUBJECT_MAP[subId];
          if (!sub) return s;
          const progress = { ...s.progress };
          sub.sections.forEach((_sec, si) => {
            sub.sections[si].items.forEach((_raw, ii) => {
              delete progress[`${subId}.${si}.${ii}`];
            });
          });
          return { progress };
        }),

      resetAll: () =>
        set({
          ...structuredClone(DEFAULT_STATE),
          settings: { ...DEFAULT_SETTINGS },
        }),

      importData: (json) => {
        try {
          const parsed = JSON.parse(json) as Partial<PersistedState>;
          set({
            progress: parsed.progress || {},
            daily: parsed.daily || {},
            activeTimer: parsed.activeTimer || null,
            seenAch: parsed.seenAch || [],
            meta: parsed.meta || { created: Date.now() },
            settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
          });
        } catch (e) {
          console.error("import failed", e);
        }
      },

      exportData: () => {
        const { progress, daily, activeTimer, seenAch, meta, settings } = get();
        return JSON.stringify(
          { progress, daily, activeTimer, seenAch, meta, settings },
          null,
          2,
        );
      },

      _recompute: () => set((s) => ({ ...s })),
    }),
    {
      name: LS_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        progress: s.progress,
        daily: s.daily,
        activeTimer: s.activeTimer,
        seenAch: s.seenAch,
        meta: s.meta,
        settings: s.settings,
      }),
      version: 1,
      migrate: (persisted: unknown) => {
        // Accept older shapes gracefully.
        const p = (persisted || {}) as Partial<PersistedState>;
        return {
          progress: p.progress || {},
          daily: p.daily || {},
          activeTimer: null, // never restore a stale running timer
          seenAch: p.seenAch || [],
          meta: p.meta || { created: Date.now() },
          settings: { ...DEFAULT_SETTINGS, ...(p.settings || {}) },
        } as Partial<StudyStoreState>;
      },
    },
  ),
);

/* ---------------- Selectors (pure derived stats) ---------------- */

export function activeElapsed(): number {
  const t = useStudyStore.getState().activeTimer;
  return t ? Math.floor((Date.now() - t.start) / 1000) : 0;
}

export function subjectStats(subId: string) {
  const sub = SUBJECT_MAP[subId];
  const state = useStudyStore.getState();
  if (!sub) {
    return { total: 0, done: 0, doing: 0, revisit: 0, starred: 0, seconds: 0, pct: 0, diff: emptyDiff() };
  }
  let done = 0,
    doing = 0,
    revisit = 0,
    seconds = 0,
    starred = 0;
  const diff = emptyDiff();
  sub.sections.forEach((sec, si) => {
    sec.items.forEach((_raw, ii) => {
      const qid = `${subId}.${si}.${ii}`;
      const topic = ITEM_INDEX[qid];
      if (topic?.difficulty && diff[topic.difficulty]) diff[topic.difficulty].total++;
      const p = state.progress[qid];
      if (!p) return;
      seconds += p.seconds || 0;
      if (p.starred) starred++;
      if (p.status === "done") {
        done++;
        if (topic?.difficulty && diff[topic.difficulty]) diff[topic.difficulty].done++;
      } else if (p.status === "doing") doing++;
      else if (p.status === "revisit") revisit++;
    });
  });
  return {
    total: sub._total,
    done,
    doing,
    revisit,
    starred,
    seconds,
    diff,
    pct: sub._total ? done / sub._total : 0,
  };
}

function emptyDiff() {
  return {
    Easy: { total: 0, done: 0 },
    Medium: { total: 0, done: 0 },
    Hard: { total: 0, done: 0 },
  };
}

export function sectionStats(subId: string, si: number) {
  const sub = SUBJECT_MAP[subId];
  const state = useStudyStore.getState();
  if (!sub || !sub.sections[si]) return { total: 0, done: 0, seconds: 0, pct: 0 };
  const sec = sub.sections[si];
  let done = 0,
    seconds = 0;
  sec.items.forEach((_raw, ii) => {
    const p = state.progress[`${subId}.${si}.${ii}`];
    if (p) {
      if (p.status === "done") done++;
      seconds += p.seconds || 0;
    }
  });
  return {
    total: sec.items.length,
    done,
    seconds,
    pct: sec.items.length ? done / sec.items.length : 0,
  };
}

export function overallStats() {
  const state = useStudyStore.getState();
  let total = 0,
    done = 0,
    doing = 0,
    seconds = 0,
    starred = 0,
    tracksStarted = 0,
    tracksDone = 0;
  const diff = emptyDiff();
  const bySubject: {
    id: string;
    name: string;
    short: string;
    color: string;
    total: number;
    done: number;
    doing: number;
    revisit: number;
    starred: number;
    seconds: number;
    pct: number;
    diff: ReturnType<typeof emptyDiff>;
  }[] = [];

  CURRICULUM.forEach((sub) => {
    const s = subjectStats(sub.id);
    total += s.total;
    done += s.done;
    doing += s.doing;
    seconds += s.seconds;
    starred += s.starred;
    if (s.done + s.doing > 0) tracksStarted++;
    if (s.total > 0 && s.done === s.total) tracksDone++;
    (["Easy", "Medium", "Hard"] as const).forEach((k) => {
      diff[k].total += s.diff[k].total;
      diff[k].done += s.diff[k].done;
    });
    bySubject.push({
      id: sub.id,
      name: sub.name,
      short: sub.short,
      color: sub.color,
      ...s,
    });
  });

  return {
    total,
    done,
    doing,
    seconds,
    starred,
    diff,
    bySubject,
    tracksStarted,
    tracksDone,
    pct: total ? done / total : 0,
  };
}

export function dailySeries(days: number) {
  const daily = useStudyStore.getState().daily;
  const out: { date: string; seconds: number }[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = todayKey(d.getTime());
    out.push({ date: key, seconds: daily[key] || 0 });
  }
  return out;
}

export function todaySeconds() {
  return useStudyStore.getState().daily[todayKey()] || 0;
}

export function goalPct() {
  const g = useStudyStore.getState().settings.dailyGoalMin * 60;
  return Math.min(1, todaySeconds() / g);
}

export function streak() {
  const daily = useStudyStore.getState().daily;
  let s = 0;
  const now = new Date();
  for (let i = 0; i < 800; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const v = daily[todayKey(d.getTime())] || 0;
    if (v > 0) s++;
    else if (i === 0) continue;
    else break;
  }
  return s;
}

export function longestStreak() {
  const daily = useStudyStore.getState().daily;
  const keys = Object.keys(daily).filter((k) => daily[k] > 0).sort();
  if (!keys.length) return 0;
  let best = 1,
    cur = 1;
  for (let i = 1; i < keys.length; i++) {
    const diff = Math.round((new Date(keys[i]).getTime() - new Date(keys[i - 1]).getTime()) / 86400000);
    if (diff === 1) {
      cur++;
      best = Math.max(best, cur);
    } else cur = 1;
  }
  return best;
}

export function activeDays() {
  const daily = useStudyStore.getState().daily;
  return Object.values(daily).filter((v) => v > 0).length;
}

export function longestSession() {
  let m = 0;
  const progress = useStudyStore.getState().progress;
  Object.values(progress).forEach((p) =>
    (p.sessions || []).forEach((s) => {
      if (s.dur > m) m = s.dur;
    }),
  );
  return m;
}

export function recentActivity(limit = 8) {
  const progress = useStudyStore.getState().progress;
  const acts: { qid: string; ts: number; dur: number; name?: string; subjectId?: string }[] = [];
  Object.keys(progress).forEach((qid) => {
    const p = progress[qid];
    (p.sessions || []).forEach((s) =>
      acts.push({
        qid,
        ts: s.ts || 0,
        dur: s.dur,
        name: ITEM_INDEX[qid]?.name,
        subjectId: ITEM_INDEX[qid]?.subjectId,
      }),
    );
  });
  acts.sort((a, b) => b.ts - a.ts);
  return acts.slice(0, limit);
}

export function upNext(limit = 6) {
  const state = useStudyStore.getState();
  const doing: {
    qid: string;
    last: number;
    seconds: number;
    status: TopicStatus;
    name: string;
    difficulty: string | null;
    subjectId: string;
    sectionIdx: number;
    sectionName: string;
  }[] = [];
  Object.keys(state.progress).forEach((qid) => {
    const p = state.progress[qid];
    const topic = ITEM_INDEX[qid];
    if (!topic) return;
    if (p.status === "doing" || p.status === "revisit") {
      const last = p.sessions.length ? p.sessions[p.sessions.length - 1].ts : 0;
      doing.push({
        qid,
        last,
        seconds: p.seconds,
        status: p.status,
        name: topic.name,
        difficulty: topic.difficulty,
        subjectId: topic.subjectId,
        sectionIdx: topic.sectionIdx,
        sectionName: topic.sectionName,
      });
    }
  });
  doing.sort((a, b) => b.last - a.last);
  if (doing.length >= limit) return doing.slice(0, limit);
  // fill with first not-started items from started tracks
  const started = new Set(doing.map((d) => d.subjectId));
  for (const topic of ITEM_INDEX ? Object.values(ITEM_INDEX) : []) {
    if (doing.length >= limit) break;
    const p = state.progress[topic.qid];
    if (!p || p.status === "todo") {
      if (started.has(topic.subjectId) || started.size === 0) {
        doing.push({
          qid: topic.qid,
          last: 0,
          seconds: 0,
          status: "todo" as TopicStatus,
          name: topic.name,
          difficulty: topic.difficulty,
          subjectId: topic.subjectId,
          sectionIdx: topic.sectionIdx,
          sectionName: topic.sectionName,
        });
      }
    }
  }
  return doing.slice(0, limit);
}

/* ---------------- Gamification ---------------- */

const LEVEL_TITLES = [
  "Novice",
  "Apprentice",
  "Learner",
  "Practitioner",
  "Skilled",
  "Adept",
  "Expert",
  "Master",
  "Grandmaster",
  "Legend",
  "Sage",
  "Wizard",
];

export function gamification() {
  const o = overallStats();
  const xp = Math.round(o.seconds / 60) + o.done * 40;
  let lvl = 1,
    need = 200,
    acc = 0;
  while (xp >= acc + need) {
    acc += need;
    lvl++;
    need = Math.round(need * 1.35);
  }
  return {
    xp,
    level: lvl,
    floor: acc,
    next: acc + need,
    inLevel: xp - acc,
    span: need,
    title: LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)],
    pct: need ? (xp - acc) / need : 0,
  };
}

interface AchievementDef {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tier: "bronze" | "silver" | "gold";
  test: (s: { done: number; seconds: number; streak: number; longest: number; tracksStarted: number; tracksDone: number; goalPct: number }) => boolean;
  prog: (s: { done: number; seconds: number; streak: number; longest: number; tracksStarted: number; tracksDone: number; goalPct: number }) => number;
}

/* Completion milestones scale to the ACTUAL curriculum size, so they always
   stay meaningful (and "Completionist" == finishing every topic in the app). */
export const TOTAL_TOPICS = CURRICULUM.reduce((n, s) => n + (s._total || 0), 0);
export const TOTAL_TRACKS = CURRICULUM.length;
const pctTopics = (f: number) => Math.max(1, Math.round(TOTAL_TOPICS * f));
const M5 = pctTopics(0.05);
const M25 = pctTopics(0.25);
const M50 = pctTopics(0.5);
const M75 = pctTopics(0.75);
const M100 = TOTAL_TOPICS;

const ACHIEVEMENTS: AchievementDef[] = [
  // ---- completion milestones (scaled to total topics) ----
  { id: "first", name: "First Steps", desc: "Complete your first topic", icon: "flag", tier: "bronze", test: (s) => s.done >= 1, prog: (s) => Math.min(1, s.done / 1) },
  { id: "p5", name: "Warming Up", desc: `Complete ${M5} topics (5%)`, icon: "zap", tier: "bronze", test: (s) => s.done >= M5, prog: (s) => s.done / M5 },
  { id: "p25", name: "Quarter Master", desc: `Complete ${M25} topics (25%)`, icon: "medal", tier: "silver", test: (s) => s.done >= M25, prog: (s) => s.done / M25 },
  { id: "p50", name: "Halfway Hero", desc: `Complete ${M50} topics (50%)`, icon: "medal", tier: "gold", test: (s) => s.done >= M50, prog: (s) => s.done / M50 },
  { id: "p75", name: "Home Stretch", desc: `Complete ${M75} topics (75%)`, icon: "trophy", tier: "gold", test: (s) => s.done >= M75, prog: (s) => s.done / M75 },
  { id: "p100", name: "Completionist", desc: `Complete all ${M100} topics`, icon: "crown", tier: "gold", test: (s) => s.done >= M100, prog: (s) => s.done / M100 },
  // ---- time invested ----
  { id: "h1", name: "In the Zone", desc: "Study for 1 hour total", icon: "clock", tier: "bronze", test: (s) => s.seconds >= 3600, prog: (s) => s.seconds / 3600 },
  { id: "h10", name: "Dedicated", desc: "Study for 10 hours total", icon: "clock", tier: "silver", test: (s) => s.seconds >= 36000, prog: (s) => s.seconds / 36000 },
  { id: "h50", name: "Marathoner", desc: "Study for 50 hours total", icon: "clock", tier: "gold", test: (s) => s.seconds >= 180000, prog: (s) => s.seconds / 180000 },
  // ---- consistency ----
  { id: "s3", name: "On a Roll", desc: "3-day study streak", icon: "flame", tier: "bronze", test: (s) => s.streak >= 3, prog: (s) => s.streak / 3 },
  { id: "s7", name: "Week Warrior", desc: "7-day study streak", icon: "flame", tier: "silver", test: (s) => s.streak >= 7, prog: (s) => s.streak / 7 },
  { id: "s30", name: "Unstoppable", desc: "30-day study streak", icon: "flame", tier: "gold", test: (s) => s.streak >= 30, prog: (s) => s.streak / 30 },
  { id: "focus", name: "Deep Focus", desc: "A single 45-min session", icon: "target", tier: "silver", test: (s) => s.longest >= 2700, prog: (s) => s.longest / 2700 },
  // ---- breadth across tracks ----
  { id: "explorer", name: "Explorer", desc: `Start topics in 5 of ${TOTAL_TRACKS} tracks`, icon: "compass", tier: "bronze", test: (s) => s.tracksStarted >= 5, prog: (s) => s.tracksStarted / 5 },
  { id: "polyglot", name: "Polyglot", desc: `Touch all ${TOTAL_TRACKS} tracks`, icon: "layers", tier: "silver", test: (s) => s.tracksStarted >= TOTAL_TRACKS, prog: (s) => s.tracksStarted / TOTAL_TRACKS },
  { id: "master", name: "Track Master", desc: "Fully complete any one track", icon: "crown", tier: "gold", test: (s) => s.tracksDone >= 1, prog: (s) => Math.min(1, s.tracksDone / 1) },
  { id: "allTracks", name: "Grand Slam", desc: `Complete all ${TOTAL_TRACKS} tracks`, icon: "trophy", tier: "gold", test: (s) => s.tracksDone >= TOTAL_TRACKS, prog: (s) => s.tracksDone / TOTAL_TRACKS },
  // ---- habit ----
  { id: "goal", name: "Goal Getter", desc: "Hit your daily study goal", icon: "check", tier: "bronze", test: (s) => s.goalPct >= 1, prog: (s) => s.goalPct },
];

export function achievements() {
  const o = overallStats();
  const s = {
    done: o.done,
    seconds: o.seconds,
    streak: streak(),
    longest: longestSession(),
    tracksStarted: o.tracksStarted,
    tracksDone: o.tracksDone,
    goalPct: goalPct(),
  };
  return ACHIEVEMENTS.map((a) => ({
    id: a.id,
    name: a.name,
    desc: a.desc,
    icon: a.icon,
    tier: a.tier,
    unlocked: a.test(s),
    progress: Math.min(1, a.prog(s)),
  }));
}

/** Returns list of newly-unlocked achievements and marks them seen. */
export function pollNewAchievements() {
  const state = useStudyStore.getState();
  const seen = new Set(state.seenAch || []);
  const now = achievements();
  const fresh = now.filter((a) => a.unlocked && !seen.has(a.id));
  if (fresh.length) {
    useStudyStore.setState({
      seenAch: now.filter((a) => a.unlocked).map((a) => a.id),
    });
  }
  return fresh;
}

export { CURRICULUM, SUBJECT_MAP, ITEM_INDEX };
