import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, newPassword, otp } = body;

    if (!email || !newPassword || !otp) {
      return NextResponse.json(
        { message: "Email, password, and OTP are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user?.resetOtp || !user?.otpExpiry || new Date() > user?.otpExpiry) {
      return NextResponse.json(
        { message: "OTP expired or invalid" },
        { status: 400 }
      );
    }

    if (user.resetOtp !== otp) {
      return NextResponse.json({ message: "Incorrect OTP" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
