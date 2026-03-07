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
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
