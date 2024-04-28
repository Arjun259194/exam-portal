"use server";
import db from "@/database";
import MailService from "@/lib/email";
import { PasswordHash } from "@/lib/hash";
import { loginFormSchema } from "@/lib/schema";
import { env } from "process";
import { headers } from "next/headers";

export default async function action(formData: FormData) {
   const parsedObj = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!parsedObj.success) throw new Error(parsedObj.error.message);

   const origin = headers().get("Origin")

   const {
      data: { email, password },
   } = parsedObj;

   const foundUser = await db.user.findByEmail(email);
   if (!foundUser) throw new Error("User not found");

   if (foundUser.type === "ADMIN") {
      if (foundUser.password !== env.ADMIN_PASSWORD) {
         throw new Error("not valid password");
      }
   } else {
      const isAuth = await PasswordHash.check(password, foundUser.password);
      if (!isAuth) throw new Error("not valid password");
   }

   const OTP =
      (await db.otp.find(foundUser.id)) || (await db.otp.new(foundUser.id));

   const mailer = new MailService({
      pass: process.env.EMAIL_TOKEN,
      user: process.env.EMAIL_ADDRESS,
   });

   const u = new URL("/api/auth/verify", origin!);
   u.searchParams.set("code", OTP.code.toString());
   u.searchParams.set("id", foundUser.id);

   try {
      await mailer.sendMail({
         type: "Verify",
         email: foundUser.email,
         username: foundUser.username,
         url: u.toString(),
      });
   } catch (err) {
      throw new Error("Failed to send OPT email");
   }
}
