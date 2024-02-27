import { Question } from "@/utils/classes";
import { PrismaClient } from "@prisma/client";

type DBMcqTest = PrismaClient["mCQTest"];
type DBMCQQuestion = PrismaClient["mCQQuestion"];

export class MCQOperations {
  private mcqTest: DBMcqTest;
  private mcqQuestion: DBMCQQuestion;

  constructor(m: DBMcqTest, q: DBMCQQuestion) {
    this.mcqTest = m;
    this.mcqQuestion = q;
  }

  public addQuestions() {}

  public async new(userID: string, data: Question[]) {
    const res = await this.mcqTest.create({ data: { userId: userID } });

    await Promise.all(
      data.map(async (q) => {
        return await this.mcqQuestion.create({
          data: {
            ...q,
            title: "TODO",
            subject: "TODO",
            publish: false,
            MCQTest: {
              connect: { id: res.id },
            },
          },
        });
      })
    ).catch(async (err) => {
      await this.mcqTest.delete({ where: { id: res.id } });
      throw new Error("Failed to create questions with error ", err);
    });
  }

  public async getMany(userID: string) {
    return await this.mcqTest.findMany({
      // where: { userId: userID },
      include: { questions: true, user: true },
    });
  }

  // public async delete(id: string) {
  //   return await this.mcqTest.delete()
  // }

  public async get(testId: string) {
    return await this.mcqTest.findFirst({
      where: { id: testId },
      include: { questions: true },
    });
  }
}
