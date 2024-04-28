import { CommonTestProps } from "@/types";
import { MCQQuesion, TypingQuesion, WrittenQuestion } from "@/utils/classes";
import { PrismaClient } from "@prisma/client";
import { prisma } from ".";
import { revalidatePath } from "next/cache";

type DBWrittenQuestion = PrismaClient["writtenQuenstion"];
type DBWriitenTest = PrismaClient["writtenTest"];
type DBMcqTest = PrismaClient["mCQTest"];
type DBMCQQuestion = PrismaClient["mCQQuestion"];
type DBTypingTest = PrismaClient["typingTest"];
type DBTypingQuestion = PrismaClient["typingQuestions"];

interface NewMcqTest {
   type: "MCQ";
   title: string;
   subject: string;
   userID: string;
   questions: MCQQuesion[];
   releaseAt: Date;
   withholdAt: Date;
}

interface NewWrittenTest {
   type: "WRITTEN";
   title: string;
   subject: string;
   userID: string;
   questions: WrittenQuestion[];
   releaseAt: Date;
   withholdAt: Date;
}

interface NewTypingTest {
   type: "Typing";
   title: string;
   subject: string;
   userID: string;
   questions: TypingQuesion[];
   releaseAt: Date;
   withholdAt: Date;
}

type NewTestParam = NewMcqTest | NewWrittenTest | NewTypingTest;

export class TestOperations {
   constructor(
      private mcqTest: DBMcqTest,
      private mcqQuestion: DBMCQQuestion,
      private writtenTest: DBWriitenTest,
      private writtenQuestion: DBWrittenQuestion,
      private typingTest: DBTypingTest,
      private typingQuesion: DBTypingQuestion,
   ) { }

   private async createNewMcqTest({ questions, ...param }: NewMcqTest) {
      const res = await this.mcqTest.create({
         data: {
            createrId: param.userID,
            title: param.title,
            subject: param.subject,
            releaseAt: param.releaseAt,
            withholdAt: param.withholdAt,
         },
      });

      Promise.all(
         questions.map(
            async (q) =>
               await this.mcqQuestion.create({
                  data: {
                     ...q,
                     MCQTest: {
                        connect: { id: res.id },
                     },
                  },
               }),
         ),
      );
   }

   private async createNewWrittenTest(param: NewWrittenTest) {
      const res = await this.writtenTest.create({
         data: {
            withholdAt: param.withholdAt,
            releaseAt: param.releaseAt,
            title: param.title,
            subject: param.subject,
            createrId: param.userID,
         },
      });

      await Promise.all(
         param.questions.map(async (q) => {
            return await this.writtenQuestion.create({
               data: {
                  ...q,
                  test: {
                     connect: { id: res.id },
                  },
               },
            });
         }),
      );
   }

   public async new(param: NewTestParam) {
      if (param.type === "MCQ") return this.createNewMcqTest(param);
      else if (param.type === "WRITTEN") return this.createNewWrittenTest(param);
   }

   public async getManyCommon() {
      const { written, mcq, typing } = await this.getMany();

      let tests: CommonTestProps[] = [
         ...written.map((w) => {
            return {
               id: w.id,
               type: "WRITTEN",
               createrId: w.createrId,
               title: w.title,
               subject: w.subject,
               createdAt: w.createdAt,
               releaseAt: w.releaseAt,
               withholdAt: w.withholdAt,
               creater: w.creater,
            } satisfies CommonTestProps;
         }),
         ...mcq.map((m) => {
            return {
               id: m.id,
               type: "MCQ",
               createrId: m.createrId,
               title: m.title,
               subject: m.subject,
               createdAt: m.createdAt,
               releaseAt: m.releaseAt,
               withholdAt: m.withholdAt,
               creater: m.creater,
            } satisfies CommonTestProps;
         }),
         ...typing.map((t) => {
            return {
               id: t.id,
               type: "TYPING",
               createrId: t.createrId,
               title: t.title,
               subject: t.subject,
               createdAt: t.createdAt,
               releaseAt: t.releaseAt,
               withholdAt: t.withholdAt,
               creater: t.creater,
            } satisfies CommonTestProps;
         }),
      ];

      return tests;
   }

   public async getMany() {
      const mcqTest = await this.mcqTest.findMany({
         include: {
            questions: true,
            creater: true,
            answers: {
               include: {
                  user: true,
               },
            },
         },
      });

      const writtenTest = await this.writtenTest.findMany({
         include: {
            questions: true,
            creater: true,
            answers: {
               include: {
                  user: true,
               },
            },
         },
      });

      const typingTest = await this.typingTest.findMany({
         include: {
            questions: true,
            creater: true,
            TypeingAnswer: true,
         },
      });

      return { mcq: mcqTest, written: writtenTest, typing: typingTest } as const;
   }

   public async get(testId: string) {
      const mcqTest = await this.mcqTest.findFirst({
         where: { id: testId },
         include: {
            creater: true,
            questions: true,
            answers: { include: { user: true } },
         },
      });

      if (mcqTest) return { ...mcqTest, type: "MCQ" } as const;

      const writtenTest = await this.writtenTest.findFirst({
         where: { id: testId },
         include: {
            creater: true,
            questions: true,
            answers: { include: { user: true } },
         },
      });

      if (writtenTest) return { ...writtenTest, type: "WRITTEN" } as const;

      const typingTest = await this.typingTest.findFirst({
         where: { id: testId },
         include: {
            creater: true,
            questions: true,
            TypeingAnswer: {
               include: {
                  user: true,
               },
            },
         },
      });

      if (typingTest) return { ...typingTest, type: "TYPING" } as const;

      return null;
   }

   public delete = async (id: string) => {
      console.log(id);
      try {
         await prisma.mCQTest.delete({
            where: { id },
         });
      } catch (err) {
         console.log(err);
         try {
            await prisma.writtenTest.delete({
               where: { id },
            });
         } catch (err) {
            console.log(err);
            try {
               await prisma.typingTest.delete({
                  where: { id },
               });
            } catch (err) {
               console.log(err);
               throw new Error("No test found for deletion");
            }
         }
      }
   };
}
