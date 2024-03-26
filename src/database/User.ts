import { PasswordHash } from "@/lib/hash";
import { PrismaClient } from "@prisma/client";
import { type User } from "@prisma/client";
import { prisma } from ".";

type UserConfig = Omit<User, "id">;
type DBUser = PrismaClient["user"];

export class UserOperations {
  private user: DBUser;

  constructor(user: DBUser) {
    this.user = user;
  }


  public new = async (newUser: UserConfig) =>
    await this.user.create({
      data: {
        ...newUser,
        password: await PasswordHash.new(newUser.password),
      },
    });

  public all = async () => await this.user.findMany()


  public findById = async (id: string) =>
    await this.user.findFirst({ where: { id } });

  public findByEmail = async (email: string) => {
    return await this.user.findFirst({ where: { email } });
  }
}
