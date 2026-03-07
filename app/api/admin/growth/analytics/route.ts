import { NextResponse } from "next/server";

export async function GET() {
  // Simulating Growth & Revenue Data
  return NextResponse.json({
    revenue: {
      total: "₹4.2M",
      growth: "+24%",
      lead_revenue: "₹1.8M",
      app_fee_revenue: "₹2.4M"
    },
    funnel: [
      { step: "Search/Discovery", count: 120000, conv: "100%" },
      { step: "College Visits", count: 45000, conv: "37.5%" },
      { step: "Lead Submissions", count: 8500, conv: "18.8%" },
      { step: "Applications", count: 2100, conv: "24.7%" },
      { step: "Final Admissions", count: 680, conv: "32.3%" }
    ],
    top_performers: [
      { name: "IIT Bombay", leads: 420 },
      { name: "BITS Pilani", leads: 380 },
      { name: "SRM University", leads: 310 },
      { name: "VIT Vellore", leads: 280 }
    ]
  });
}
