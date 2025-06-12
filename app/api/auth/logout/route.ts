import * as cookie from "cookie"; // Updated import
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(
    {
      message: "Logout Successful",
    },
    { status: 200 }
  );

  res.headers.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Expire the cookie immediately
      path: "/",
    })
  );

  return res;
}
