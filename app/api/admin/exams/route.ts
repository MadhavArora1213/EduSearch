import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        _count: {
          select: { cutoffs: true, courses: true }
        }
      },
      orderBy: { exam_date: "asc" }
    });
    return NextResponse.json(exams);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 });
  }
}
