import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const cleanUsername = username?.trim().toLowerCase();

    if (!cleanUsername || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    // Check if account already exists
    const existing = await prisma.account.findUnique({
      where: { username: cleanUsername },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Username is already taken." },
        { status: 409 }
      );
    }

    // Initialize with default state
    const defaultData = {
      progress: {},
      daily: {},
      seenAch: [],
      meta: { created: Date.now() },
      settings: {
        dailyGoalMin: 120,
        pomoFocus: 25,
        pomoBreak: 5,
        celebrate: true,
      },
      profile: {
        avatar: "grad-1",
        customTitle: "Novice Learner",
        motto: "Consistency is key.",
      },
    };

    // Create the account in Neon DB
    const account = await prisma.account.create({
      data: {
        username: cleanUsername,
        password: password, // Simple plain password comparison for development as per user requirements
        data: defaultData,
      },
    });

    return NextResponse.json({
      success: true,
      username: account.username,
      data: account.data,
    });
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
