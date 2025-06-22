import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Extract search param safely
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    // Query authors matching name, case-insensitive, optional search
    const authors = await prisma.user.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        stories: {
          some: {
            published: true,
          },
        },
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
          select: {
            id: true,
          },
        },
      },
    });

    // Format authors with story count
    const authorsWithCount = authors.map((author) => ({
      id: author.id,
      name: author.name,
      bio: author?.profile?.bio || "",
      image: author?.profile?.image || "",
      email: author.email,
      storyCount: author.stories.length,
    }));

    return NextResponse.json({ authors: authorsWithCount }, { status: 200 });
  } catch (error) {
    console.error("GET /api/authors error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
