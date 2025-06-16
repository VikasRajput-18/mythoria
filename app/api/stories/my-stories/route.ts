import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = verifyUser(req); // ✅ reusable check
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing token." },
        { status: 401 }
      );
    }

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where: {
          authorId: userId,
          title: {
            contains: search as string,
            mode: "insensitive", // optional: case-insensitive
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.story.count({
        where: {
          authorId: userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return NextResponse.json(
      {
        stories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong fetching stories." },
      { status: 500 }
    );
  }
}
