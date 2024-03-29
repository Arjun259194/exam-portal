import { Question } from "@/utils/classes";
import { PrismaClient, WrittenTest } from "@prisma/client";

type DBWrittenQuestion = PrismaClient["writtenQuenstion"];
type DBWriitenTest = PrismaClient["writtenTest"];
type DBMcqTest = PrismaClient["mCQTest"];
type DBMCQQuestion = PrismaClient["mCQQuestion"];
type NewQuestionParam = {
  subject: string;
  title: string;
  userID: string;
  questions: Question[];
};

export class TestOperations {
  constructor(
    private mcqTest: DBMcqTest,
    private mcqQuestion: DBMCQQuestion,
    private writtenTest: DBWriitenTest,
    private writtenQuestion: DBWrittenQuestion,
  ) { }

  public async new({ questions, ...param }: NewQuestionParam) {
    const res = await this.mcqTest.create({
      data: {
        createrId: param.userID,
        publish: false, // user will public it later
        title: param.title,
        subject: param.subject,
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
    ).catch(async (err) => {
      await this.mcqTest.delete({ where: { id: res.id } });
      throw new Error("Failed to create questions with error ", err);
    });
  }

  public async getMany() {
    const mcqTest = await this.mcqTest.findMany({
      include: {
        questions: true,
        creater: true,
        answers: { include: { user: true } },
      },
    });

    const writtenTest = await this.writtenTest.findMany({
      include: {
        questions: true,
        creater: true, // TODO: add answers to the model and include it here
        answers: true,
      },
    });

    return { mcq: mcqTest, written: writtenTest } as const;
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
      include: { creater: true, questions: true, answers: true },
    });

    if (writtenTest) return { ...writtenTest, type: "WRITTEN" } as const;

    return null;
  }

  public delete = async (id: string) => {
    Promise.all([
      await this.mcqTest.delete({
        where: { id: id },
        include: { answers: true, questions: true },
      }),
      await this.writtenTest.delete({
        where: { id: id },
        include: { answers: true, questions: true },
      }),
    ]);
  };
}
