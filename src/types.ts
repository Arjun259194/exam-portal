import { User } from "@prisma/client";
import db from "./database";
import { Question } from "./utils/classes";

export type UserRole = Prettify<User["type"]>;

export type FnFormAction<T> = (arg1: FormData) => Promise<T>;

export type Choices = [string, string, string, string];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ClassName = string | undefined;

export type NewMcqTest = Array<Question>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type UnionToFunctions<U> = U extends unknown ? (k: U) => void : never;

type IntersectionOfFunctionsToType<F> = F extends {
  (a: infer A): void;
  (b: infer B): void;
  (c: infer C): void;
}
  ? [A, B, C]
  : F extends { (a: infer A): void; (b: infer B): void }
    ? [A, B]
    : F extends { (a: infer A): void }
      ? [A]
      : never;

type SplitType<T> = IntersectionOfFunctionsToType<
  UnionToIntersection<UnionToFunctions<T>>
>;

export type Test = NonNullable<Awaited<ReturnType<typeof db.test.get>>>;
export type Tests = NonNullable<Awaited<ReturnType<typeof db.test.getMany>>>;

export type TestMcq = SplitType<Test>[0];
export type TestWritten = SplitType<Test>[1];

export type WrittenTest = Awaited<
  ReturnType<typeof db.test.getMany>
>["written"][number];

// email
interface DefaultMailConfig {
   username: string;
   email: string;
}

interface VerificationMailConfig extends DefaultMailConfig {
   type: "Verify";
   url: string;
}

interface  NotificationMailConfig extends DefaultMailConfig  {
   type: "Notification";
   message: string[];
}

interface DebugMailConfig extends DefaultMailConfig {
   type: "Debug";
   message: string[];
}

interface  TeacherRequestAcceptedMailConfig extends DefaultMailConfig {
   type: "TeacherRequestAccepted";
   url: string;
};

interface ResultMailConfig extends DefaultMailConfig  {
   type: "Result";
   score: boolean[];
   testName: string;
}

export type MailConfig =
   | VerificationMailConfig
   | NotificationMailConfig
   | DebugMailConfig
   | TeacherRequestAcceptedMailConfig
   | ResultMailConfig;

