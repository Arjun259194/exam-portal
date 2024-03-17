"use server";

import { prisma } from "@/database";
import { redirect } from "next/navigation";

export default async function action(formdata: FormData) {
  const answersArrStr = formdata.get("answers") as string | null;
  const testID = formdata.get("testId") as string | null;
  const userID = formdata.get("userId") as string | null;
  if (!answersArrStr || !testID || !userID) {
    throw new Error("Not Valid data");
  }

  const answers = JSON.parse(answersArrStr) as string[];

  await prisma.mCQAnswer.create({
    data: { userId: userID, testId: testID, answers: answers },
  });

  await prisma.attendedTest.create({
    data: { userID, testID },
  });

  redirect("/dashboard");
}
