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

    // Find the account in database
    const account = await prisma.account.findUnique({
      where: { username: cleanUsername },
    });

    if (!account || account.password !== password) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      username: account.username,
      data: account.data,
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sign in." },
      { status: 500 }
    );
  }
}
