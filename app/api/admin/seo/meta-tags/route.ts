import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const colleges = await prisma.college.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
      },
      take: 20
    });
    
    // Simulating Meta Tags since they aren't explicitly in the current schema
    // In a real app, we'd have an SEO model or JSON field.
    // For this spec, I'll return them as derived fields or placeholder for the admin to 'edit'.
    const seoData = colleges.map(c => ({
      id: c.id,
      page: `/colleges/${c.slug}`,
      title: `${c.name} ${c.city}: Admission, Courses, Fees & Ranking`,
      description: `Get detailed information about ${c.name}, ${c.city} - Indian entrance exams accepted, admission process, rankings, fee structure and student reviews.`,
      status: "AUTO-GENERATED"
    }));

    return NextResponse.json(seoData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SEO data" }, { status: 500 });
  }
}
