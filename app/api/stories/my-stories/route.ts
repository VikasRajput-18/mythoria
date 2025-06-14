import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = verifyUser(req); // ✅ reusable check

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing token." },
        { status: 401 }
      );
    }

    const stories = await prisma.story.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        stories,
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
