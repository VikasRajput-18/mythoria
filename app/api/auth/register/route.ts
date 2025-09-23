// app/api/auth/verify-signup-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or OTP" },
        { status: 400 }
      );
    }

    // expired / missing check
    if (!user.resetOtp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return NextResponse.json(
        { message: "OTP expired or not found, please request again" },
        { status: 400 }
      );
    }

    if (user.resetOtp !== otp) {
      return NextResponse.json({ message: "Incorrect OTP" }, { status: 400 });
    }

    // OTP matched — mark verified and clear otp fields
    await prisma.user.update({
      where: { email },
      data: { isVerified: true, resetOtp: null, otpExpiry: null },
    });

    return NextResponse.json(
      { message: "Signup verified. You can now sign in." },
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-signup-otp error:", err);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
