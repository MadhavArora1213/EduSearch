import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const blogs = await prisma.blogPost.findMany({
      where: search ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } }
        ]
      } : {},
      orderBy: { created_at: "desc" }
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blog = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        author: body.author,
        status: body.status || 'DRAFT',
        featured_image: body.featured_image
      }
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        author: data.author,
        status: data.status,
        featured_image: data.featured_image
      }
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
