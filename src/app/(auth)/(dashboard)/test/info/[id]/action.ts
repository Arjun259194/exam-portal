"use server";
import { prisma } from "@/database";
import MailService from "@/lib/email";
import { revalidatePath } from "next/cache";
import { env } from "process";

export async function submitTypingTestResult(formdata: FormData) {

}

export async function checkMcqTest(formdata: FormData) {
  const answerID = formdata.get("id");
  if (!answerID) throw new Error("ID not found in formdata");

  const answer = await prisma.mCQAnswer.findFirst({
    where: {
      id: answerID.toString(),
    },
    include: {
      test: {
        include: {
          questions: true,
        },
      },
      user: true,
    },
  });

  if (!answer) throw new Error("answer not found");

  const { test } = answer;

  const correct = answer.answers.map((a, i) => {
    return a.split(".").at(-1) === test.questions[i].correctAnswer;
  });

  const totalMarks = correct.reduce((prev, curr, i) => {
    return curr ? test.questions[i].marks + prev : prev;
  }, 0);

  const mail = new MailService({
    user: env.EMAIL_ADDRESS,
    pass: env.EMAIL_TOKEN,
  });

  await mail.sendMail({
    type: "Result",
    email: answer.user.email,
    score: correct,
    testName: test.title,
    username: answer.user.username,
    totalMarks: totalMarks,
  });

  await prisma.mCQAnswer.update({
    where: { id: answerID.toString() },
    data: { checked: true },
  });

  revalidatePath("/test/info/[id]");
}
