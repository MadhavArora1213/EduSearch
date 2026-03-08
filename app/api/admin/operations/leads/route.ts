import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        college: { select: { name: true } }
      },
      orderBy: { created_at: "desc" }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayLeads = leads.filter(l => new Date(l.created_at) >= today);
    const highQualityCount = todayLeads.filter(l => l.quality_score === 'HIGH').length;

    // Hourly data for the last 12 hours
    const hourlyData = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setHours(d.getHours() - (11 - i));
      const hourStr = `${d.getHours().toString().padStart(2, '0')}:00`;
      const count = leads.filter(l => {
        const ld = new Date(l.created_at);
        return ld.getHours() === d.getHours() && ld.getDate() === d.getDate();
      }).length;
      return { hour: hourStr, count };
    });

    return NextResponse.json({
      leads,
      stats: {
        todayIntake: todayLeads.length,
        highQualityPct: todayLeads.length > 0 ? (highQualityCount / todayLeads.length * 100).toFixed(1) : "0",
        totalLeads: leads.length
      },
      hourlyData
    });
  } catch (error) {
    console.error("Leads Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
