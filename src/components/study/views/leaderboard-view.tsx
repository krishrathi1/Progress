"use client";

import * as React from "react";
import { Clock, Crown, Medal, RotateCcw, Trophy } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fmtDurationLong } from "@/lib/format";

type Entry = { rank: number; username: string; avatar: string; xp: number; level: number; topicsDone: number; studySeconds: number; updatedAt: string };
const podiumStyles = ["border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-orange-500/5", "border-slate-400/40 bg-gradient-to-br from-slate-400/15 to-transparent", "border-orange-700/40 bg-gradient-to-br from-orange-700/15 to-transparent"];
const avatarGradients: Record<string, string> = {
  "grad-1": "from-amber-400 to-orange-600",
  "grad-2": "from-violet-500 to-fuchsia-700",
  "grad-3": "from-cyan-400 to-blue-600",
  "grad-4": "from-rose-400 to-red-600",
  "grad-5": "from-emerald-400 to-teal-700",
};

export function LeaderboardView({ currentUser }: { currentUser: string }) {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/leaderboard", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load rankings.");
      setEntries(result.leaderboard || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load rankings.");
    } finally { setLoading(false); }
  }, []);

  React.useEffect(() => { load(); }, [load]);
  const me = entries.find((entry) => entry.username === currentUser);

  return <div className="space-y-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><div className="mb-1 flex items-center gap-2 text-amber-500"><Trophy className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.18em]">Community standings</span></div><h2 className="font-display text-2xl font-black tracking-tight md:text-3xl">Leaderboard</h2><p className="mt-1 text-sm text-muted-foreground">Earn XP by studying and completing topics. Rankings update from cloud progress.</p></div>
      <Button variant="outline" size="sm" onClick={load} disabled={loading}><RotateCcw className={cn("mr-1.5 h-3.5 w-3.5", loading && "animate-spin")} />Refresh</Button>
    </div>

    {me && <Card className="border-amber-500/30 bg-amber-500/5"><CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4"><UserAvatar entry={me} className="h-11 w-11" /><div><div className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Your rank</div><div className="text-2xl font-black">{me.rank}</div></div><div className="h-9 w-px bg-border" /><Stat label="XP" value={me.xp.toLocaleString()} /><Stat label="Level" value={me.level} /><Stat label="Topics done" value={me.topicsDone} /></CardContent></Card>}

    {error ? <Card className="border-destructive/40"><CardContent className="p-6 text-center text-sm text-destructive">{error}</CardContent></Card> : loading ? <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">Loading online rankings...</CardContent></Card> : entries.length === 0 ? <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">No ranked users yet. Start studying to take first place.</CardContent></Card> : <>
      <div className="grid gap-3 md:grid-cols-3">{entries.slice(0, 3).map((entry, index) => <Card key={entry.username} className={cn("relative overflow-hidden", podiumStyles[index])}><CardContent className="p-5"><div className="mb-4 flex items-start justify-between"><UserAvatar entry={entry} className="h-16 w-16 border-2 shadow-lg" /><RankIcon rank={entry.rank} className="h-10 w-10" /></div><div className="truncate text-lg font-black">{entry.username}{entry.username === currentUser && <span className="ml-2 text-xs text-amber-500">YOU</span>}</div><div className="mt-1 text-sm font-bold text-amber-500">{entry.xp.toLocaleString()} XP</div><div className="mt-3 flex gap-3 text-xs text-muted-foreground"><span>Level {entry.level}</span><span>{entry.topicsDone} topics</span></div></CardContent></Card>)}</div>
      <Card><CardHeader className="pb-2"><CardTitle className="text-base">All rankings</CardTitle></CardHeader><CardContent className="p-0 sm:px-2 sm:pb-2"><div className="divide-y">{entries.map((entry) => <div key={entry.username} className={cn("grid grid-cols-[40px_38px_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3 sm:grid-cols-[48px_42px_minmax(0,1fr)_100px_120px_110px]", entry.username === currentUser && "bg-amber-500/8")}><div className="flex justify-center">{entry.rank <= 3 ? <RankIcon rank={entry.rank} className="h-6 w-6" /> : <span className="text-sm font-black text-muted-foreground">{entry.rank}</span>}</div><UserAvatar entry={entry} className="h-9 w-9" /><div className="min-w-0"><div className="truncate text-sm font-bold">{entry.username}{entry.username === currentUser && <span className="ml-2 text-[10px] text-amber-500">YOU</span>}</div><div className="text-[11px] text-muted-foreground sm:hidden">Level {entry.level} · {entry.topicsDone} topics</div></div><div className="hidden text-sm text-muted-foreground sm:block">Level {entry.level}</div><div className="hidden text-sm text-muted-foreground sm:block">{entry.topicsDone} topics</div><div className="text-right"><div className="text-sm font-black text-amber-500">{entry.xp.toLocaleString()} XP</div><div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground"><Clock className="h-3 w-3" />{fmtDurationLong(entry.studySeconds)}</div></div></div>)}</div></CardContent></Card>
    </>}
  </div>;
}

function Stat({ label, value }: { label: string; value: string | number }) { return <div><div className="text-[10px] text-muted-foreground">{label}</div><div className="font-bold">{value}</div></div>; }

function UserAvatar({ entry, className }: { entry: Entry; className?: string }) {
  const customImage = entry.avatar?.startsWith("data:image");
  return <div className={cn("shrink-0 overflow-hidden rounded-full border border-white/20 bg-gradient-to-br", !customImage && (avatarGradients[entry.avatar] || avatarGradients["grad-1"]), className)}>{customImage ? <img src={entry.avatar} alt={`${entry.username}'s avatar`} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-sm font-black uppercase text-white">{entry.username.slice(0, 2)}</div>}</div>;
}

function RankIcon({ rank, className }: { rank: number; className?: string }) {
  if (rank === 1) return <Crown className={cn("text-yellow-400 drop-shadow-sm", className)} weight="fill" />;
  return <Medal className={cn(rank === 2 ? "text-slate-300" : "text-amber-700", "drop-shadow-sm", className)} weight="fill" />;
}
