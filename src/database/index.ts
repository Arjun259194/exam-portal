import { PrismaClient, type User, type Otp } from "@prisma/client";
import { UserOperations } from "@/database/User";
import { OtpOperations } from "@/database/Otp";

class Database {
  public user;
  public otp;
  constructor() {
    const prisma = new PrismaClient();
    this.user = new UserOperations(prisma.user);
    this.otp = new OtpOperations(prisma.otp);
  }
}

const db = new Database();
export default db;
