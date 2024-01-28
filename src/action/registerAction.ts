"use server";

import prisma from "@/prisma";
import { FnFormAction } from "@/types";
import { hashPassword } from "@/utils/hash";
import { z } from "zod";

const registerFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  type: z.enum(["STUDENT", "TEACHER"]),
  password: z.string().min(8).max(16),
});

export const registerAction: FnFormAction = async (formData) => {
  const parseData = registerFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    type: formData.get("role"),
    password: formData.get("password"),
  });

  if (!parseData.success) throw new Error(parseData.error.message);

  const { data } = parseData;

  await prisma.user.create({
    data: { ...data, password: await hashPassword(data.password) },
  });

  return;
};
