import { NextResponse } from "next/server";

export async function GET() {
  // Simulating Audit Log Data
  return NextResponse.json([
    { id: "a1", admin: "Super Admin", action: "COLLEGE_UPDATE", target: "IIT Bombay", details: "Changed 'naac_grade' from A to A++", time: "10 mins ago", ip: "192.168.1.1", status: "SUCCESS" },
    { id: "a2", admin: "Admin Vishal", action: "SEO_META_CHANGE", target: "SRM University", details: "Updated Meta Title for SRM Kattankulathur", time: "42 mins ago", ip: "172.16.0.4", status: "SUCCESS" },
    { id: "a3", admin: "System", action: "AUTH_FAILURE", target: "admin@edusearch.com", details: "3 failed login attempts from Mumbai IP", time: "3 hours ago", ip: "103.21.114.7", status: "FLAGGED" },
    { id: "a4", admin: "Editor Sneha", action: "REVIEW_MODERATION", target: "Review #1422", details: "Approved student review for BITS Pilani", time: "Yesterday", ip: "192.168.1.42", status: "SUCCESS" }
  ]);
}
