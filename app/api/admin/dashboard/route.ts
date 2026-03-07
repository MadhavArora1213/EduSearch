import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const studentsCount = await prisma.user.count({ where: { role: 'STUDENT' } });
    const leadsCount = await prisma.lead.count();
    const pendingReviews = await prisma.review.count({ where: { status: 'PENDING' } });
    const collegesCount = await prisma.college.count();

    const topColleges = await prisma.college.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      select: { name: true }
    });

    const recentAlerts = [
      { id: 1, type: 'INFO', text: 'System Boot Up', time: new Date().toISOString() },
    ];

    return NextResponse.json({
      kpis: {
        students: studentsCount,
        leads: leadsCount,
        reviews: pendingReviews,
        colleges: collegesCount,
      },
      topColleges: topColleges.map((c, i) => ({
        name: c.name,
        searches: 1000 - i * 100, // Mocking searches
        change: '+5%'
      })),
      alerts: recentAlerts
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
