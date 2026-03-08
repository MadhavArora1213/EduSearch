import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { created_at: "desc" },
      take: 100
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const log = await prisma.auditLog.create({
      data: {
        admin_email: body.admin_email,
        action: body.action,
        entity_type: body.entity_type,
        entity_id: body.entity_id,
        old_value: JSON.stringify(body.old_value),
        new_value: JSON.stringify(body.new_value),
        ip_address: body.ip_address,
        status: body.status || "SUCCESS",
      }
    });
    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 });
  }
}
