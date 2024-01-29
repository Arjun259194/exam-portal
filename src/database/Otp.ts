import { PrismaClient } from "@prisma/client";

type DBOtp = PrismaClient["otp"];

export class OtpOperations {
  private otp: DBOtp;

  constructor(otp: DBOtp) {
    this.otp = otp;
  }

  private genRandOTPCode = (
    codeLen = 8,
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  ) =>
    Array.from({ length: codeLen }, () =>
      Math.floor(Math.random() * chars.length)
    ).join("");

  public new = async (id: string) =>
    this.otp.create({
      data: {
        code: this.genRandOTPCode(),
        userId: id,
      },
    });

  public find = async (id: string) =>
    this.otp.findFirst({
      where: { userId: id },
      orderBy: { id: "desc" },
    });

  public delete = async (id: string) =>
    this.otp.delete({
      where: {
        id: id,
      },
    });
}
