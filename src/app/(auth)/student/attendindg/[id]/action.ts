"use server";

import { prisma } from "@/database";
import { getSessionUser } from "@/utils";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";

export async function createWrittenTestAnswer(formdata: FormData) {
  const user = await getSessionUser();

  const file: File | null = formdata.get("file") as unknown as File;

  if (!file) throw new Error("file not found");

  const testId = formdata.get("testId");
  if (!testId) throw new Error("testId not found");

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const path = `public/${user.id}-${file.name}`;

  await writeFile(path, buffer).catch((err) => {
    console.error(err);
    throw new Error();
  });

  await prisma.writtenAnswer.create({
    data: {
      path: path,
      userId: user.id,
      writtenTestId: testId.toString(),
    },
  });

  await prisma.attendedTest.create({
    data: {
      testID: testId.toString(),
      userID: user.id,
    },
  });
}

export async function createTypingTest(formdata: FormData) {
  const answersArrStr = formdata.get("answers") as string | null;
  const testID = formdata.get("testId") as string | null;
  const userID = formdata.get("userId") as string | null;
  if (!answersArrStr || !testID || !userID) {
    throw new Error("Not Valid data");
  }

  const answers = JSON.parse(answersArrStr) as string[];

  await prisma.typeingAnswer.create({
    data: {
      answers: answers,
      testID: testID,
      userId: userID,
    },
  });

  await prisma.attendedTest.create({
    data: { userID, testID },
  });
}

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
