import { compare, hash } from "bcrypt";

export class PasswordHash {

    static SALT_ROUND: number = 10;

    static async new(data: string, saltRounds?: number) {
        return await hash(data, saltRounds ?? this.SALT_ROUND)
    }

    static async check(data: string, encrypted: string) {
      return await compare(data, encrypted)
    }
}
