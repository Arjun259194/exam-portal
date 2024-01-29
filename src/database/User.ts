import { hashPassword } from "@/utils/hash";
import { PrismaClient } from "@prisma/client";
import { type User } from "@prisma/client";

type UserConfig = Omit<User, "id">;
type DBUser = PrismaClient["user"];

export class UserOperations {
  private user: DBUser;
  constructor(user: DBUser) {
    this.user = user;
  }

  public new = async (newUser: UserConfig) =>
    this.user.create({
      data: {
        ...newUser,
        password: await hashPassword(newUser.password),
      },
    });

  public findById = async (id: string) =>
    this.user.findFirst({ where: { id } });

  public findByEmail = async (email: string) =>
    this.user.findFirst({ where: { email } });
}
