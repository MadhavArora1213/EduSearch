import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contracts = await prisma.partnerContract.findMany({
      include: {
        university: true
      },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json(contracts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contract = await prisma.partnerContract.create({
      data: {
        university_id: body.university_id,
        commission_pct: body.commission,
        payment_cycle: body.cycle || "MONTHLY",
        payout_pending: body.payoutPending || 0,
        total_enrolled: body.totalEnrolled || 0,
        status: body.status || "ACTIVE",
        expiry_date: new Date(body.expiry),
      }
    });
    return NextResponse.json(contract);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 });
  }
}
