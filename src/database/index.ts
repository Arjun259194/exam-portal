import { PrismaClient } from "@prisma/client";
import { UserOperations } from "@/database/User";
import { OtpOperations } from "@/database/Otp";
import { MCQOperations } from "./MCQTest";

class Database {
  public user;
  public otp;
  public mcq;

  constructor() {
    const prisma = new PrismaClient();
    this.user = new UserOperations(prisma.user);
    this.otp = new OtpOperations(prisma.otp);
    this.mcq = new MCQOperations(prisma.mCQTest, prisma.mCQQuestion)
  }
}

const db = new Database();
export default db;
