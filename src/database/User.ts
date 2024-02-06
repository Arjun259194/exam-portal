import { PasswordHash } from "@/utils/hash";
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
    await this.user.create({
      data: {
        ...newUser,
        password: await PasswordHash.new(newUser.password),
      },
    });

  public findById = async (id: string) =>
    await this.user.findFirst({ where: { id } });

  public findByEmail = async (email: string) => {
    return await this.user.findFirst({ where: { email } });
  }
}
