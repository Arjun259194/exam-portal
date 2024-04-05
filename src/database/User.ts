import { PasswordHash } from "@/lib/hash";
import { PrismaClient } from "@prisma/client";
import { type User } from "@prisma/client";

type UserConfig = Omit<User, "id">;
type DBUser = PrismaClient["user"];

export class UserOperations {
  private user: DBUser;

  constructor(user: DBUser) {
    this.user = user;
  }

  public delete = async (id: string) =>
    await this.user.delete({
      where: { id },
      include: {
        Otp: true,
        MCQTest: {
          include: {
            answers: true,
            questions: true,
          },
        },
        WrittenTest: {
          include: {
            answers: true,
            questions: true,
          },
        },
        TypingTest: {
          include: {
            TypeingAnswer: true,
            questions: true,
          },
        },
      },
    });

  public new = async (newUser: UserConfig) =>
    await this.user.create({
      data: {
        ...newUser,
        password: await PasswordHash.new(newUser.password),
      },
    });

  public all = async () => await this.user.findMany();

  public findById = async (id: string) =>
    await this.user.findFirst({ where: { id } });

  public findByEmail = async (email: string) => {
    return await this.user.findFirst({ where: { email } });
  };
}
