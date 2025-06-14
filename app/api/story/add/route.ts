import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Tag } from "../../../../types";
import { verifyUser } from "../../../../lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      title,
      description,
      genre,
      content,
      tags,
      audience,
      status,
      type,
      pages,
      thumbnail,
    } = await req.json();

    if (!title || !description || !type || !status) {
      return NextResponse.json(
        { message: "Title,description, type, and status are required." },
        { status: 400 }
      );
    }

    const userId = verifyUser(req); // ✅ reusable check

    const isPublished = status === "publish";

    const story = await prisma.story.create({
      data: {
        title,
        description,
        genre,
        audience: audience.toUpperCase(),
        type: type.toUpperCase(),
        content: type === "other" ? content : null,
        coverImage: thumbnail ?? null,
        published: isPublished,
        author: { connect: { id: Number(userId) } },

        //   tags
        tags: {
          create: tags.map((tag: Tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.name },
                create: { name: tag.name },
              },
            },
          })),
        },
        pages:
          type === "book"
            ? {
                create: pages.map((page: any, idx: number) => ({
                  pageNumber: idx + 1,
                  content: page.content,
                })),
              }
            : undefined,
      },
    });

    return NextResponse.json(
      { message: "Story created successfully", story },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
