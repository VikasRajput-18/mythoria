import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return NextResponse.json({ user: null }, { status: 200 }); // <-- always 200
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decode.userId),
      },
      select: {
        id: true,
        email: true,
        name: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 }); // <-- always 200
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 }); // <-- always 200
  }
}
