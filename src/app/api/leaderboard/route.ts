import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProgressEntry = { status?: string; seconds?: number };

function levelFromXp(xp: number) {
  let level = 1, required = 200, accumulated = 0;
  while (xp >= accumulated + required) {
    accumulated += required;
    level += 1;
    required = Math.round(required * 1.35);
  }
  return level;
}

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Server database is not configured." }, { status: 503 });
  }

  try {
    const accounts = await prisma.account.findMany({
      select: { username: true, data: true, updatedAt: true },
    });
    const leaderboard = accounts.map((account) => {
      const data = account.data as { progress?: Record<string, ProgressEntry>; profile?: { avatar?: string } } | null;
      const entries = Object.values(data?.progress ?? {});
      const topicsDone = entries.filter((entry) => entry?.status === "done").length;
      const studySeconds = entries.reduce((sum, entry) => sum + Math.max(0, Number(entry?.seconds) || 0), 0);
      const xp = Math.round(studySeconds / 60) + topicsDone * 40;
      return { username: account.username, avatar: data?.profile?.avatar || "grad-1", xp, level: levelFromXp(xp), topicsDone, studySeconds, updatedAt: account.updatedAt.toISOString() };
    }).sort((a, b) => b.xp - a.xp || b.topicsDone - a.topicsDone || b.studySeconds - a.studySeconds || a.username.localeCompare(b.username))
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json({ error: "Failed to load the online leaderboard." }, { status: 500 });
  }
}
