import { NextResponse } from "next/server";

export async function GET() {
  // Simulating Notification Hub Data
  return NextResponse.json({
    active_campaigns: [
      { id: "c1", name: "JEE Main 2026 Registration Open", type: "GLOBAL", channel: "PUSH", sent: 850000, open_rate: "12%" },
      { id: "c2", name: "Scholarship Deadline Reminder", type: "SEGMENTED", channel: "WHATSAPP", sent: 42000, open_rate: "68%" },
      { id: "c3", name: "Review Approved Alert", type: "LIFECYCLE", channel: "EMAIL", sent: "---", open_rate: "82%" }
    ],
    status: {
      delivery_rate: "99.2%",
      queue_size: 1422,
      whatsapp_balance: "₹12,400"
    }
  });
}
