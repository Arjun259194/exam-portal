"use server";

import db, { prisma } from "@/database";
import MailService from "@/lib/email";
import { env } from "process";
import { revalidatePath } from "next/cache";

export async function accept(formdata: FormData) {
  try {
    const id = formdata.get("id");
    const origin = formdata.get("origin") as string;
    console.log("origin: " + origin);
    if (!id) throw new Error("Something went wrong");
    const adminReq = await prisma.teacherRequest.findFirst({
      where: { id: id.toString() },
    });

    if (!adminReq) throw new Error("Something went wrong");

    const { id: _, ...data } = adminReq;

    const user = await db.user.new({ ...data, type: "TEACHER" });

    const email = new MailService({
      user: env.EMAIL_ADDRESS,
      pass: env.EMAIL_TOKEN,
    });

    const OTP = await db.otp.new(user.id);

    const u = new URL("/api/auth/verify", origin.toString());
    u.searchParams.set("code", OTP.code.toString());
    u.searchParams.set("id", user.id);

    await prisma.teacherRequest.delete({
      where: {
        id: id.toString(),
      },
    });

    revalidatePath(`/admin`);

    await email
      .sendMail({
        type: "TeacherRequestAccepted",
        username: user.username,
        url: u.toString(),
        email: user.email,
      })
      .catch((err) => console.error(`Failed to send the mail ${err}`));
  } catch (error) {
    console.error(`error: ${error}`);
    throw new Error("Something went wrong");
  }
}

export async function reject(formdata: FormData) {
  try {
    const id = formdata.get("id");
    if (!id) throw new Error("Something went wront");
    await prisma.teacherRequest.delete({
      where: {
        id: id.toString(),
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function removeUser(formdata: FormData) {
  const id = formdata.get("id");
  if (!id) throw new Error("No id provided");

  console.log("function called");
  console.log("id:", id.toString());

  await prisma.otp.deleteMany({ where: { userId: id.toString() } });
  await db.user.delete(id.toString());

  revalidatePath("/admin");
  return;
}

export async function removeTest(formdata: FormData) {
  const id = formdata.get("id");
  if (!id) throw new Error("Id not found");
  try {
    await db.test.delete(id.toString());
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
}
