import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    // ✅ Wrap auth check separately so you can return a proper 401
    let userId;
    try {
      userId = verifyUser(req, "You must be logged in to like this story.");
    } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { message: "Missing story id" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const storyId = Number(id);

    // Check if Like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_storyId: {
          userId,
          storyId,
        },
      },
    });

    if (existingLike) {
      // Unlike: delete the Like row
      await prisma.like.delete({
        where: {
          userId_storyId: {
            userId,
            storyId,
          },
        },
      });
      return NextResponse.json(
        { liked: false, message: "Like removed" },
        { status: 200 }
      );
    } else {
      // Like: create the Like row
      await prisma.like.create({
        data: {
          user: { connect: { id: userId } },
          story: { connect: { id: storyId } },
        },
      });
      return NextResponse.json(
        { liked: true, message: "Liked" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
