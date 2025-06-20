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
    console.error(error);
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

    const userId = await verifyUser(req, "You must be logged in see comments.");
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
    const comments = await prisma.comment.findMany({
      where: {
        storyId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
