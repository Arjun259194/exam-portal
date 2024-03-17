import { PrismaClient } from "@prisma/client";
import { UserOperations } from "@/database/User";
import { OtpOperations } from "@/database/Otp";
import { TestOperations } from "./Test";

class Database {
  public user;
  public otp;
  public test;

  constructor(prisma: PrismaClient) {
    this.user = new UserOperations(prisma.user);
    this.otp = new OtpOperations(prisma.otp);
    this.test = new TestOperations(
      prisma.mCQTest,
      prisma.mCQQuestion,
      prisma.writtenTest,
      prisma.writtenQuenstion,
    );
  }
}

export const prisma = new PrismaClient()

const db = new Database(prisma);
export default db;
