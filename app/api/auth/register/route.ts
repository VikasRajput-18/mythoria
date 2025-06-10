import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;
  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  console.log({ email, name, password });
  const existingUser = await prisma.user.findUnique({ where: { email } });
  console.log("-----existingUser--------", existingUser);

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already used" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
