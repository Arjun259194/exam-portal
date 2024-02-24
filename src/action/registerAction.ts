"use server";
import db from "@/database";
import { registerFormSchema } from "@/lib/schema";
import { FnFormAction } from "@/types";

export const registerAction: FnFormAction = async (formData) => {
  const parseData = registerFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    type: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parseData.success) throw new Error(parseData.error.message);

  const { data } = parseData;

  const foundUser = await db.user.findByEmail(data.email)

  if (foundUser) throw new Error("Email already used by other user!");

  await db.user.new(data).catch(err => {
    console.log(err)
    throw new Error("Failed to register new user")
  })

  return;
};
