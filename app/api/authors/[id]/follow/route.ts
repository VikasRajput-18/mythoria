import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";

export async function PUT(
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
    let targetId = Number(params.id);

    if (!Number.isInteger(Number(targetId)) || Number(targetId) <= 0) {
      return NextResponse.json(
        { message: "Invalid author id." },
        { status: 400 }
      );
    }

    let userId = verifyUser(req);
    userId = Number(userId);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    if (targetId === userId) {
      return NextResponse.json(
        { message: "You cannot follow yourself." },
        { status: 400 }
      );
    }
    //  Check if already following using composite unique key (recommended)
    const existing = await prisma.follow.findUnique({
      where: {
        // use the composite unique defined in schema: followerId_followingId
        followerId_followingId: {
          followerId: userId,
          followingId: targetId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Already following." },
        { status: 200 }
      );
    }

    // Create follow (simple create)
    const follow = await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: targetId,
      },
    });

    return NextResponse.json(
      { message: "Followed successfully.", follow },
      { status: 201 }
    );
  } catch (error) {
    // 6) Handle unique-constraint race (rare): if two requests create at same time
    if ((error as Prisma.PrismaClientKnownRequestError)?.code === "P2002") {
      return NextResponse.json(
        { message: "Already following." },
        { status: 200 }
      );
    }
    console.error("Follow error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
