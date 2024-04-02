"use server";

import db from "@/database";
import MailService from "@/lib/email";
import { env } from "process";

export default async function check(formData: FormData) {
  const id = formData.get("id");
  if (!id) throw new Error("Can't find id");

  const userID = formData.get("userID");
  if (!userID) throw new Error("no user ID");

  const user = await db.user.findById(userID.toString());
  if (!user) throw new Error("can't find user in database");

  const score = formData.get("score");
  if (!score) throw new Error("Can't find score");

  const test = await db.test.get(id.toString());
  if (!test) throw new Error("can't find the test");

  const scoreArr = JSON.parse(score.toString()) as boolean[] | null | undefined;
  if (!scoreArr) throw new Error("Something went wrong");

  const mail = new MailService({
    user: env.EMAIL_ADDRESS,
    pass: env.EMAIL_TOKEN,
  });

  await mail.sendMail({
    type: "Result",
    testName: test.title,
    username: user.username,
    score: scoreArr,
    email: user.email,
  });

  return;
}
