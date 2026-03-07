import { NextResponse } from "next/server";

export async function GET() {
  // Simulating Articles Data
  return NextResponse.json([
    { id: "b1", title: "Top 10 Engineering Colleges in 2026", author: "Editorial Team", status: "PUBLISHED", date: "Jul 12, 2025", views: "42.1K", category: "COLLEGE_GUIDES" },
    { id: "b2", title: "JEE Main 2026 Syllabus Updated", author: "News Desk", status: "SCHEDULED", date: "Dec 01, 2025", views: "---", category: "EXAM_ALERTS" },
    { id: "b3", title: "How to choose between CSE and AI", author: "Dr. Arun Kumar", status: "DRAFT", date: "Aug 15, 2025", views: "---", category: "CAREER_ADVICE" },
    { id: "b4", title: "Admission Process for NITs", author: "Editorial Team", status: "PUBLISHED", date: "Jun 10, 2025", views: "12.8K", category: "ADMISSION_HELP" }
  ]);
}
