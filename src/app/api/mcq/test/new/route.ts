import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { newMcqTestReq } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = AuthCookie.value;
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
  const userID = JWTToken.valid(token);
  if (!userID)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  const json = await request.json();
  const parsedObj = newMcqTestReq.safeParse(json);
  if (!parsedObj.success) {
    return NextResponse.json({}, { status: 400 });
  }

  const { data } = parsedObj;

  const { questions, title, subject, releaseDate, withholdDate } = data;

  try {
    await db.test.new({
      type: "MCQ",
      userID,
      questions,
      title,
      subject,
      releaseAt: releaseDate,
      withholdAt: withholdDate,
    });
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.redirect(new URL("/test", request.url));
}
