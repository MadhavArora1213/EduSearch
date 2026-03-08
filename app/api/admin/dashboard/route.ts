import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const studentsCount = await prisma.user.count({ where: { role: 'STUDENT' } });
    const leadsCount = await prisma.lead.count();
    const pendingReviews = await prisma.review.count({ where: { status: 'PENDING' } });
    const collegesCount = await prisma.college.count();

    // 1. Top Colleges based on Leads count
    const topCollegesRaw = await prisma.college.findMany({
      take: 5,
      orderBy: { leads: { _count: 'desc' } },
      select: { name: true, _count: { select: { leads: true } } }
    });
    
    const topColleges = topCollegesRaw.map((c: any) => ({
      name: c.name,
      leads: c._count.leads,
      change: `Real-time`
    }));

    // Generate dates for the last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return { 
        name: d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
        dateStr: d.toISOString().split('T')[0] 
      };
    });

    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

    // 2. Student Activity (DAU based on Users, AI based on AI Counselor Logs)
    const recentUsers = await prisma.user.findMany({
      where: { created_at: { gte: date7DaysAgo }, role: 'STUDENT' },
      select: { created_at: true }
    });
    const recentAiLogs = await prisma.aICounselorLog.findMany({
      where: { created_at: { gte: date7DaysAgo } },
      select: { created_at: true }
    });

    const activityData = days.map((day: any) => {
       const dCount = recentUsers.filter((u: any) => u.created_at.toISOString().startsWith(day.dateStr)).length;
       const aCount = recentAiLogs.filter((a: any) => a.created_at.toISOString().startsWith(day.dateStr)).length;
       return { name: day.name, dau: dCount, ai: aCount };
    });

    // 3. Lead Velocity
    const recentLeads = await prisma.lead.findMany({
      where: { created_at: { gte: date7DaysAgo } },
      select: { created_at: true, course_interest: true }
    });

    const leadVelocity = days.map((day: any) => {
       const dayLeads = recentLeads.filter((l: any) => l.created_at.toISOString().startsWith(day.dateStr));
       return {
         day: day.name.split(' ')[0], 
         eng: dayLeads.filter((l: any) => l.course_interest?.toLowerCase().includes('btech') || l.course_interest?.toLowerCase().includes('eng')).length,
         mba: dayLeads.filter((l: any) => l.course_interest?.toLowerCase().includes('mba')).length,
         med: dayLeads.filter((l: any) => l.course_interest?.toLowerCase().includes('mbbs') || l.course_interest?.toLowerCase().includes('med')).length,
       };
    });

    // 4. Revenue Trend (based on applications)
    const recentApps = await prisma.application.findMany({
      where: { applied_at: { gte: date7DaysAgo }, payment_status: 'PAID' },
      select: { applied_at: true, id: true }
    });

    const revenueTrend = days.map((day: any) => {
      const dayAppsCount = recentApps.filter((a: any) => a.applied_at.toISOString().startsWith(day.dateStr)).length;
      return {
        date: day.name,
        revenue: dayAppsCount * 5000, // Still hypothetical revenue per app, but based on real count
      }
    });

    // 5. Moderation Pipeline (Reviews)
    const reviewCounts = await prisma.review.groupBy({
       by: ['status'],
       _count: true
    });
    
    // Map status to our chart format
    const modMap: Record<string, any> = {
       PENDING: { name: 'Pending', color: '#0F172A', value: 0 },
       APPROVED: { name: 'Approved', color: '#10B981', value: 0 },
       REJECTED: { name: 'Rejected', color: '#EF4444', value: 0 },
    };
    reviewCounts.forEach((r: any) => {
       if (modMap[r.status]) modMap[r.status].value = r._count;
    });
    const moderationData = Object.values(modMap);
    
    // Alerts
    const alerts = [
      { id: 1, type: 'INFO', text: `Database Online: ${studentsCount} Students linked`, time: new Date().toISOString() },
      { id: 2, type: 'DEBUG', text: `Lead Registry: ${leadsCount} Entries indexed`, time: new Date().toISOString() }
    ];

    return NextResponse.json({
      kpis: {
        students: studentsCount,
        leads: leadsCount,
        reviews: pendingReviews,
        colleges: collegesCount,
        revenueMTD: recentApps.length * 5000 // Approximate MTD revenue
      },
      topColleges,
      activityData,
      leadVelocity,
      revenueTrend,
      moderationData,
      alerts
    });
  } catch (error) {
    console.error("Dashboard Data Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
