// lib/auth.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyUser(req: NextRequest , errMsg = "Unauthorized: No token") {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error(errMsg);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return Number(decoded.userId);
  } catch (err) {
    throw new Error("Unauthorized: Invalid token");
  }
}
