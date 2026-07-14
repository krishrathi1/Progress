import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Server database is not configured. Add DATABASE_URL in Vercel and redeploy." },
        { status: 503 }
      );
    }

    const { username, data } = await request.json();
    const cleanUsername = username?.trim().toLowerCase();

    if (!cleanUsername || !data) {
      return NextResponse.json(
        { error: "Username and sync data are required." },
        { status: 400 }
      );
    }

    // Update user progress data in Neon DB
    const account = await prisma.account.update({
      where: { username: cleanUsername },
      data: { data: data },
    });

    return NextResponse.json({
      success: true,
      username: account.username,
    });
  } catch (error: any) {
    console.error("Sync API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync progress." },
      { status: 500 }
    );
  }
}
