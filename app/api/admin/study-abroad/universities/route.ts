import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const universities = await prisma.university.findMany({
      where: {
        ...(search ? { 
          OR: [
            { name: { contains: search } },
            { country: { contains: search } },
            { city: { contains: search } }
          ]
        } : {})
      },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json(universities);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const uni = await prisma.university.create({
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        qs_rank: body.qsRank,
        acceptance: body.acceptance,
        tuition_usd: body.tuitionUSD,
        ielts_min: body.ielts,
        status: body.status || "ACTIVE",
        is_partner: body.partner || false,
      }
    });
    return NextResponse.json(uni);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create university" }, { status: 500 });
  }
}
