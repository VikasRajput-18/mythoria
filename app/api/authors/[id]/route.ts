import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

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
      },
    });

    return NextResponse.json({ author }, { status: 200 });
  } catch (error) {
    console.error("GET /api/authors error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
