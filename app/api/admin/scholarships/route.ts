import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { deadline: "asc" }
    });
    return NextResponse.json(scholarships);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch scholarships" }, { status: 500 });
  }
}
