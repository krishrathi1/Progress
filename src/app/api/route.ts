import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        status: "offline",
        database: "not configured",
        error: "DATABASE_URL is missing from the server environment.",
      },
      { status: 503 }
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "online", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error);
    return NextResponse.json(
      {
        status: "offline",
        database: "unreachable",
        error: "The server could not connect to PostgreSQL.",
      },
      { status: 503 }
    );
  }
}
