import { compare, hash } from "bcrypt";

export const hashPassword = 
    async (password: string, SALT_ROUND: number = 10) =>
        await hash(password, SALT_ROUND);

export const checkPassword = 
    async (password: string, hashPassword: string) =>
        await compare(password, hashPassword);
