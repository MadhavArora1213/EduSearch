import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const exam_id = searchParams.get("exam_id");

    const cutoffs = await prisma.cutoff.findMany({
      where: exam_id ? { exam_id } : {},
      include: {
        course: {
          include: { college: { select: { name: true } } }
        },
        exam: { select: { name: true } }
      },
      orderBy: { year: "desc" }
    });

    return NextResponse.json(cutoffs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cutoffs" }, { status: 500 });
  }
}
