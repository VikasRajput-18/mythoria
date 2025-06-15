import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const search = searchParams.get("search") || "";
  try {
    const stories = await prisma.story.findMany({
      where: {
        published: true,
        title: {
          contains: search as string,
          mode: "insensitive", // optional: case-insensitive
        },
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
