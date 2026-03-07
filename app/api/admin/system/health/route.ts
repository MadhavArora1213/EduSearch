import { NextResponse } from "next/server";

export async function GET() {
  // Simulating System Health telemetry
  return NextResponse.json({
    database: {
      status: "HEALTHY",
      latency: "14ms",
      active_connections: 12,
      pool_usage: "42%",
      last_backup: "4 hours ago (Hostinger)"
    },
    errors: [
      { id: "e1", code: 500, count: 42, impact: "HIGH", message: "Timeout in /api/ai/counselor", time: "10 mins ago" },
      { id: "e2", code: 404, count: 850, impact: "LOW", message: "Missing /colleges/favicon.ico", time: "Every minute" },
      { id: "e3", code: 403, count: 12, impact: "MEDIUM", message: "Forbidden access attempt at /admin/.env", time: "2 hours ago" }
    ],
    infrastructure: {
      cpu_usage: "14%",
      ram_usage: "2.4 GB / 8 GB",
      disk: "42% used"
    }
  });
}
