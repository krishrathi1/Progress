# 📚 StudyTracker — Learning Command Center

A clean, modern, local-first dashboard to track **every topic** across **DSA, Java, CS core theory, System Design & DevOps** — with a live per-topic timer, progress rings, analytics charts, a GitHub-style activity heatmap, XP/leveling and achievements.

Built with **Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Zustand · Recharts**.

> 1,067 topics across 10 tracks · everything stored locally in your browser · nothing is uploaded anywhere.

---

## ✨ Features

### 10 complete tracks (1,067 topics)

| Track | Source | Topics |
|-------|--------|-------:|
| Striver A2Z DSA | takeuforward | 418 |
| Core Java | GeeksforGeeks | 166 |
| OOPs Concepts | GeeksforGeeks | 46 |
| DBMS | GeeksforGeeks | 61 |
| Operating Systems | GeeksforGeeks | 69 |
| Computer Networks | GeeksforGeeks | 69 |
| System Design | GeeksforGeeks | 81 |
| AWS Basics | GeeksforGeeks | 53 |
| Docker | GeeksforGeeks | 45 |
| SQL | GeeksforGeeks | 59 |

### ⏱️ Focus timer
- Start a timer on any topic — a floating bar docks at the bottom and keeps running.
- **Stop** saves the time, **Done** saves time *and* marks the topic complete.
- Optional **Pomodoro mode** (configurable focus/break durations).
- Only one timer runs at a time; starting a new one auto-saves the previous.

### 📊 Dashboard & analytics
- **Progress rings** for every track + overall completion.
- **Level / XP** system with titles (Novice → Wizard).
- **Daily goal** ring that fills as you study.
- **26-week activity heatmap** spanning the full section width.
- **Study-time line chart** (7/30/60/90-day ranges).
- **Difficulty donut** (Easy/Medium/Hard solved).
- **Time-by-track** and **topics-by-track** bar charts.
- **Current & longest streak**, active days, longest session.

### 🏆 Gamification
- 16 achievements across Bronze / Silver / Gold tiers with live progress.
- Unlock toasts when you hit milestones.

### 🎛️ Managing your progress
- ✅ Checkbox to mark complete · ⭐ Star to revisit · 🔗 One-click resource link per topic.
- 📝 Per-topic notes editor.
- 🔎 Search + filter (To do / In progress / Done / Starred) inside every track.
- ⌘K **command palette** to search 1,000+ topics instantly.

### 💾 Your data
- Everything stored locally (`localStorage`) — nothing uploaded.
- **Export** a `.json` backup · **Import** to restore · **Reset** to start over.
- Adjustable daily goal, Pomodoro durations and celebration toasts.

---

## 🚀 Getting started

```bash
# install dependencies
bun install

# start the dev server (http://localhost:3000)
bun run dev

# lint
bun run lint
```

That's it — open the app and start tracking. No database server or external services required.

---

## ⌨️ Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Quick find (search topics) |
| `g` then `d` | Dashboard |
| `g` then `a` | Analytics |
| `g` then `c` | Achievements |
| `g` then `s` | Data & Settings |
| `?` | Show shortcuts help |

---

## 🏗️ Architecture

```
src/
├─ app/                      # Next.js app router (layout, page, globals)
├─ lib/
│  ├─ types.ts               # Typed domain model
│  ├─ format.ts              # Time / date / number formatters
│  ├─ store.ts               # Zustand store + persistence + selectors
│  └─ curriculum/            # The 10 study tracks (typed data modules)
│     ├─ index.ts            # Normalized index (SUBJECT_MAP, ITEM_INDEX)
│     ├─ dsa.ts  java.ts  cs-core.ts  system-devops.ts
└─ components/
   ├─ ui/                    # shadcn/ui primitives
   └─ study/                 # App shell, sidebar, timer, palette, heatmap,
      └─ views/              # dashboard, track, analytics, achievements, data
```

**State management:** Zustand with a `localStorage`-persisted slice. All derived stats (overall/subject/section stats, streaks, gamification, achievements) are pure selector functions that read from the store.

**Curriculum:** Each track is a typed module exporting a `Subject`. The `curriculum/index.ts` module builds a normalized `ITEM_INDEX` / `ALL_ITEMS` so every topic has a stable id (`${subjectId}.${sectionIdx}.${itemIdx}`).

---

## 🛠️ Extend it

Add a topic by dropping a string into any section's `items` array (or `["Name", "Medium"]` for a difficulty tag) in `src/lib/curriculum/*.ts`. Add a whole new track by creating a new `Subject` module and pushing it to the `CURRICULUM` array in `index.ts`.

---

Built with a dark-first design system · Fira-style mono numerals · zero external runtime calls.
