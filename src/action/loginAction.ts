"use server";
import db from "@/database";
import { FnFormAction } from "@/types";
import MailService from "@/utils/email";
import { checkPassword } from "@/utils/hash";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  origin: z.string(),
});

export const loginAction: FnFormAction = async (formData) => {
  const parsedObj = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    origin: formData.get("origin"),
  });

  if (!parsedObj.success) throw new Error(parsedObj.error.message);

  const {
    data: { email, password, origin },
  } = parsedObj;

  const foundUser = await db.user.findByEmail(email);

  if (!foundUser) throw new Error("User not found");

  const isAuth = await checkPassword(password, foundUser.password);

  if (!isAuth) throw new Error("not valid password");

  const OTP =
    (await db.otp.find(foundUser.id)) || (await db.otp.new(foundUser.id));

  const mailer = new MailService({
    pass: process.env.EMAIL_TOKEN,
    user: process.env.EMAIL_ADDRESS,
  });

  const u = new URL("/api/auth/verify", origin);
  u.searchParams.set("code", OTP.code.toString());
  u.searchParams.set("id", foundUser.id);

  try {
    await mailer.sendMail({
      type: "Verify",
      code: OTP.code,
      email: foundUser.email,
      username: foundUser.username,
      url: u.toString(),
    });
  } catch (err) {
    throw new Error("Failed to send OPT email");
  }
};
