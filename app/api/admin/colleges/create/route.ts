import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      slug, 
      city, 
      state, 
      type, 
      naac_grade, 
      approval_bodies, 
      established_year, 
      about_description 
    } = body;

    const college = await prisma.college.create({
      data: {
        name,
        slug,
        city,
        state,
        type,
        naac_grade,
        approval_bodies,
        established_year: established_year ? parseInt(established_year) : null,
        about_description,
      }
    });

    return NextResponse.json(college);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create college profile" }, { status: 500 });
  }
}
