import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { commentText } = await req.json();
    const { id } = params;

    if (!commentText || commentText.trim() === "") {
      return NextResponse.json(
        { message: "Comment cannot be empty." },
        { status: 400 }
      );
    }

    const userId = await verifyUser(req, "You must be logged in to comment.");
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "Missing Story Id" },
        { status: 400 }
      );
    }

    const storyId = Number(id);
    await prisma.comment.create({
      data: {
        content: commentText,
        authorId: userId,
        storyId,
      },
    });

    return NextResponse.json(
      { message: "Comment Successfully Added" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // const userId = await verifyUser(req, "You must be logged in see comments.");
    // if (!userId) {
      // return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    if (!id) {
      return NextResponse.json(
        { message: "Missing Story Id" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const storyId = Number(id);

    const totalCount = await prisma.comment.count({
      where: { storyId },
    });

    const comments = await prisma.comment.findMany({
      where: {
        storyId,
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
            profile: {
              select: {
                image: true,
                bio: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc", // or "asc" if you want oldest first
      },
    });

    return NextResponse.json({ totalCount, comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
