import { NextResponse } from "next/server";

export async function GET() {
  // Simulating AI Operational Data
  return NextResponse.json({
    models: [
      { name: "Llama 3.1 (70B)", provider: "Groq", status: "HEALTHY", latency: "24ms", rate_limit: "84/100", cost_today: "$4.12" },
      { name: "GPT-4o", provider: "OpenAI", status: "HEALTHY", latency: "420ms", rate_limit: "2/10", cost_today: "$12.80" },
      { name: "Gemini 1.5 Pro", provider: "Google", status: "IDLE", latency: "---", rate_limit: "---", cost_today: "$0.00" }
    ],
    heatmap: [
      { topic: "MBA Admission 2026", count: 420 },
      { topic: "BTech Fees Comparison", count: 310 },
      { topic: "Scholarship Eligibility", count: 285 },
      { topic: "Exam Dates JEE", count: 210 }
    ],
    total_inferences: "45.2K",
    avg_quality_score: 94.2
  });
}
