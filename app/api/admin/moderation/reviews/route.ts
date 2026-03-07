import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const reviews = await prisma.review.findMany({
      where: status ? { status: status as any } : {},
      include: {
        college: { select: { name: true } },
        student: { select: { name: true, email: true } },
        course: { select: { name: true } }
      },
      orderBy: { created_at: "desc" }
    });
    
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    const review = await prisma.review.update({
      where: { id },
      data: { status: status as any }
    });
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update review status" }, { status: 500 });
  }
}
