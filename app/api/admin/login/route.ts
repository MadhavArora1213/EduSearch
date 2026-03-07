import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check for user in the database
    // For admin login, we ensure the role is SUPER_ADMIN or COLLEGE_ADMIN
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        // Since we are not doing full hashing yet (simplified for user request)
        // Adjust this if you have specific hashing requirements
        password_hash: password, 
      },
    });

    if (user && (user.role === "SUPER_ADMIN" || user.role === "COLLEGE_ADMIN")) {
      // In a real app, you'd create a secure session/JWT here
      return NextResponse.json({ 
        message: "Login successful", 
        role: user.role 
      }, { status: 200 });
    }

    return NextResponse.json({ 
      message: "Invalid email or password" 
    }, { status: 401 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ 
      message: "Database connection failed. Please check your MySQL settings in .env." 
    }, { status: 500 });
  }
}
