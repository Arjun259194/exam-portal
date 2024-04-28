"use server";
import { prisma } from "@/database";
import MailService from "@/lib/email";
import { revalidatePath } from "next/cache";
import { env } from "process";

export async function submitTypingTestResult(formdata: FormData) { }

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

   const marks = answer.answers.map((a, i) => {
      return a.split(".").at(-1) === test.questions[i].correctAnswer
         ? test.questions[i].marks
         : 0;
   });

   // const totalMarks = correct.reduce((prev, curr, i) => {
   //   return curr ? test.questions[i].marks + prev : prev;
   // }, 0);

   const gainedMarks = marks.reduce((prev, curr) => prev + curr, 0);
   const totalMarks = answer.test.questions
      .map((q) => q.marks)
      .reduce((p, c) => p + c, 0);

   const mail = new MailService({
      user: env.EMAIL_ADDRESS,
      pass: env.EMAIL_TOKEN,
   });

   await prisma.result.create({
      data: {
         totalMarks: totalMarks,
         userId: answer.user.id,
         testId: answer.testId,
         gainedMarks: gainedMarks,
         marksPerQuestion: marks,
      },
   });

   await mail.sendMail({
      type: "Result",
      email: answer.user.email,
      score: marks,
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
