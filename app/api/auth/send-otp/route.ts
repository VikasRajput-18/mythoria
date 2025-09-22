import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "../../../../lib/prisma";
import { ResetPasswordEmailTemplate } from "../../../../components/templates/reset-password-template";

const resend = new Resend(process.env.RESEND_MAIL_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email)
      return NextResponse.json({ message: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { message: "Email not registered" },
        { status: 400 }
      );

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    await prisma.user.update({
      where: { email },
      data: { resetOtp: otp, otpExpiry: expiry },
    });

    await resend.emails.send({
      from: "no-reply@mythoria-stories.com",
      to: [email],
      subject: "Your Mythoria OTP",
      react: ResetPasswordEmailTemplate({
        email,
        otp,
        supportEmail: "mythoria18@gmail.com",
      }),
    });

    // Save OTP temporarily in DB or memory with expiry (demo: just returning it)
    return NextResponse.json({ message: "OTP sent to email" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
