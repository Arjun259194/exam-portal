"use server";
import db, { prisma } from "@/database";
import { registerFormSchema } from "@/lib/schema";
import { handle } from "@/utils";

export default async function action(formData: FormData) {
   const parseData = registerFormSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      type: formData.get("role"),
      password: formData.get("password"),
   });

   if (!parseData.success) throw new Error(parseData.error.message);
   const { data } = parseData;

   const foundUser = await db.user.findByEmail(data.email);

   if (!!foundUser) {
      throw new Error("User already exits");
   }

   if (data.type === "TEACHER") {
      const existingReq = await prisma.teacherRequest.findFirst({
         where: {
            email: data.email,
         },
      });
      if (existingReq) {
         throw new Error("Request already sent\nPlease wait");
      }
      const res = await handle(async () => {
         return await prisma.teacherRequest.create({
            data: {
               username: data.username,
               password: data.password,
               email: data.email,
            },
         });
      });

      if (!res) {
         throw new Error("Error requeting");
      }

      return "Request Sended to Admin\nYou will be notified on the given email";
   }

   await db.user.new(data).catch((_) => {
      throw new Error("Failed to register new user");
   });

   return "Account created";
}
