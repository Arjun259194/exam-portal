import { MCQAnswer, MCQQuestion, MCQTest, User } from "@prisma/client";
import db, { prisma } from "./database";
import { Question } from "./utils/classes";

export type UserRole = "TEACHER" | "STUDENT" //TODO make it type safe

export type FnFormAction = (arg1: FormData) => Promise<void>

export type Choices = [string, string, string, string]

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ClassName = string | undefined

export type NewMcqTest = Array<Question>

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type UnionToFunctions<U> =
  U extends unknown ? (k: U) => void : never;

type IntersectionOfFunctionsToType<F> =
  F extends { (a: infer A): void; (b: infer B): void; (c: infer C): void; } ? [A, B, C] :
  F extends { (a: infer A): void; (b: infer B): void; } ? [A, B] :
  F extends { (a: infer A): void } ? [A] :
  never;

type SplitType<T> =
  IntersectionOfFunctionsToType<UnionToIntersection<UnionToFunctions<T>>>;

export type TestMcq = SplitType<NonNullable<Awaited<ReturnType<typeof db.test.get>>>>[0]
export type TestWritten = SplitType<NonNullable<Awaited<ReturnType<typeof db.test.get>>>>[1]


export type WrittenTest = Awaited<
  ReturnType<typeof db.test.getMany>
>["written"][number];
