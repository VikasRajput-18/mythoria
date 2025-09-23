// app/api/auth/send-signup-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import { SignupEmailTemplate } from "../../../../components/templates/sign-up-email-template";

const resend = new Resend(process.env.RESEND_MAIL_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // If user already exists (prevent duplicate signup)
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.isVerified) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user with OTP stored temporarily
    if (existing && !existing.isVerified) {
      // Update existing unverified user: replace password and OTP
      await prisma.user.update({
        where: { email },
        data: {
          name,
          password: hashedPassword,
          resetOtp: otp,
          otpExpiry: expiry,
        },
      });
    } else {
      // Create new user in unverified state
      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          resetOtp: otp,
          otpExpiry: expiry,
          isVerified: false,
        },
      });
    }

    // send OTP email (use your template)
    await resend.emails.send({
      from: "no-reply@mythoria-stories.com",
      to: [email],
      subject: "Your Mythoria verification code",
      react: SignupEmailTemplate({
        email,
        otp,
      }),
    });

    return NextResponse.json({ message: "OTP sent to email" }, { status: 200 });
  } catch (err) {
    console.error("send-signup-otp error:", err);
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
