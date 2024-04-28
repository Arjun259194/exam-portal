"use server";

import db, { prisma } from "@/database";
import MailService from "@/lib/email";
import { totalmem } from "os";

export async function wCheck(formdata: FormData) {
   const resultStr = formdata.get("result");
   if (!resultStr) throw new Error("result not found");

   const result = JSON.parse(resultStr.toString()) as number[] | null;
   if (!result) throw new Error("result not found");

   const testID = formdata.get("testID");
   if (!testID) throw new Error("testID not found");

   const test = await db.test.get(testID.toString());
   if (!test) throw new Error("test not found");

   const answerID = formdata.get("answerID");
   if (!answerID) throw new Error("answerID not found");

   const answer = await prisma.writtenAnswer.findFirst({
      where: {
         id: answerID.toString(),
      },
      include: {
         user: true,
         WrittenTest: {
            include: {
               questions: true
            }
         }
      },
   });
   if (!answer) throw new Error("user not found");

   const mailer = new MailService({
      pass: process.env.EMAIL_TOKEN,
      user: process.env.EMAIL_ADDRESS,
   });

   //TODO
   const totalMarks = answer
      .WrittenTest
      .questions
      .map(q => q.marks)
      .reduce((p, c) => p + c, 0);

   await prisma.result.create({
      data: {
         totalMarks: totalMarks,
         userId: answer.userId,
         testId: answer.writtenTestId,
         gainedMarks: result.reduce((p, c) => p + c, 0),
         marksPerQuestion: result,
      },
   })

   await mailer.sendMail({
      type: "Result",
      totalMarks: result.reduce((p, c) => p + c, 0),
      testName: test.title,
      score: result,
      username: answer.user.username,
      email: answer.user.email,
   });

   await prisma.writtenAnswer.update({
      where: { id: answerID.toString() },
      data: { checked: true },
   });

   return;
}

export async function tCheck(formdata: FormData) {
   const userID = formdata.get("userID");
   if (!userID) throw new Error("userID not found");

   const user = await db.user.findById(userID.toString());
   if (!user) throw new Error("Student not found");

   const answerID = formdata.get("answerID");
   if (!answerID) throw new Error("answerID not found");

   const answer = await prisma.typeingAnswer.findFirst({
      where: { id: answerID.toString() },
      include: {
         test: {
            include: {
               questions: true,
            },
         },
      },
   });
   if (!answer) throw new Error("answer not found");

   const resultStr = formdata.get("result");
   if (!resultStr) throw new Error("result not found");

   const result = JSON.parse(resultStr.toString().trim()) as number[];

   const mailer = new MailService({
      pass: process.env.EMAIL_TOKEN,
      user: process.env.EMAIL_ADDRESS,
   });

   const totalMarks = answer.test.questions
      .map((q) => q.marks)
      .reduce((p, c) => p + c, 0);

   // TODO
   await prisma.result.create({
      data: {
         totalMarks: totalMarks,
         userId: answer.userId,
         testId: answer.testID,
         gainedMarks: result.reduce((p, c) => p + c, 0),
         marksPerQuestion: result,
      },
   });

   await mailer.sendMail({
      type: "Result",
      email: user.email,
      username: user.username,
      score: result,
      testName: answer.test.title,
      totalMarks: result.reduce((p, c) => p + c, 0),
   });

   await prisma.typeingAnswer.update({
      data: { checked: true },
      where: {
         id: answerID.toString(),
      },
   });
}
