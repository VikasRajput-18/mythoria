import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, bio, profilePic } = await req.json();

    const userId = verifyUser(req);

    if (!userId) {
      return NextResponse.json({ message: "Missing User Id" }, { status: 403 });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: fullName,
        email: email,
      },
    });

    await prisma.profile.upsert({
      where: {
        userId,
      },
      update: {
        bio,
        image: profilePic,
      },
      create: {
        bio,
        userId,
        image: profilePic,
      },
    });

    return NextResponse.json(
      { message: "Profile Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
