import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const queryParam = z.object({ code: z.string(), id: z.string() });

export async function GET(req: NextRequest) {
  const RedirectUrl = new URL("/message", req.url);

  const params = queryParam.safeParse({
    code: req.nextUrl.searchParams.get("code"),
    id: req.nextUrl.searchParams.get("id"),
  });

  if (!params.success) {
    RedirectUrl.searchParams.set(
      "message",
      "Verification link does not have valid validation data. Try again"
    );
    RedirectUrl.searchParams.set("state", "err");
    return NextResponse.redirect(RedirectUrl);
  }

  const { data } = params;

  const otp = await db.otp.find(data.id);

  if (!otp || otp.code.toString() !== params.data.code) {
    RedirectUrl.searchParams.set("message", "not valid Link, try again");
    RedirectUrl.searchParams.set("state", "err");
    return NextResponse.redirect(RedirectUrl);
  }

  const token = JWTToken.create(otp.userId);

  await db.otp.delete(otp.id)

  AuthCookie.new(token)

  return NextResponse.redirect(new URL("/user", req.url))
}
