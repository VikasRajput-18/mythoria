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
    // try to get logged-in user id, but don't fail the request if auth missing/invalid
    let userId: number | null = null;
    try {
      // If verifyUser is async, await it. If it's sync, this still works.
      // If verifyUser throws when not authenticated, the catch below will set userId=null.
      const maybe = await verifyUser(req);
      // adapt to whatever verifyUser returns: either user id number or an object
      if (maybe === null || maybe === undefined) {
        userId = null;
      } else if (typeof maybe === "number") {
        userId = maybe;
      } else if (typeof maybe === "object" && "id" in maybe) {
        userId = Number((maybe as any).id);
      } else {
        // fallback: try to coerce to number
        const coerced = Number(maybe);
        userId = Number.isNaN(coerced) ? null : coerced;
      }
    } catch (e) {
      // not authenticated — keep userId null and continue (page remains public)
      userId = null;
    }
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
