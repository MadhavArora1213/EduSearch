import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const verified = searchParams.get("verified");
    const search = searchParams.get("search");

    const colleges = await prisma.college.findMany({
      where: {
        ...(verified === "true" ? { is_verified: true } : verified === "false" ? { is_verified: false } : {}),
        ...(search ? { 
          OR: [
            { name: { contains: search } },
            { city: { contains: search } },
            { state: { contains: search } }
          ]
        } : {})
      },
      include: {
        _count: {
          select: { courses: true, reviews: true }
        }
      },
      orderBy: { updated_at: "desc" }
    });

    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
