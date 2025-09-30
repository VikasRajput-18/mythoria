import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { count } from "console";
import { verifyUser } from "../../../../lib/auth";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = await params;
    const userId = verifyUser(req);
    const author = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },

      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            bio: true,
            image: true,
          },
        },

        stories: {
          where: {
            published: true, // ✅ Only published stories
          },
          select: {
            id: true,
            title: true,
            description: true,
            coverImage: true,
            type: true,
          },
        },
        followers: {
          select: { followerId: true }, // we just need count
        },
      },
    });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    // Count followers
    const followersCount = author.followers.length;

    // Check if logged-in user is following this author
    const isFollowing = author.followers.some((f) => f.followerId === userId);

    return NextResponse.json(
      { author: { ...author }, followersCount, isFollowing },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/authors error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
