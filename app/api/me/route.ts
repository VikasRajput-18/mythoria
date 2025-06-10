import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return NextResponse.json({ user: null }, { status: 401 });
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
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
