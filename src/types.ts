import { PrismaClient } from "@prisma/client";
import db from "./database";
import { Question } from "./utils/classes";

export type UserRole = "TEACHER"|"STUDENT" //TODO make it type safe

export type FnFormAction = (arg1: FormData) => Promise<void>

export type Choices = [string, string, string, string]

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ClassName = string | undefined

export type NewMcqTest = Array<Question>
