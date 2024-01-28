import prisma from "@/prisma";
import { Marcellus } from "next/font/google";

export const FindOPT = async (userID: string) =>
  await prisma.otp.findFirst({
    where: { userId: userID },
    orderBy: { id: "desc" },
  });

// 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

export const CreateOTP = async (userID: string) =>
  await prisma.otp.create({
    data: {
      code: genRandomOtpCode(),
      userId: userID,
    },
  });

const genRandomOtpCode = (
  codelen: number = 8,
  chars: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
) =>
  Array.from({ length: codelen }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
