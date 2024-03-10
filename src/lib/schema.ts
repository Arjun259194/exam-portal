import z from "zod";

export const newMcqTestReq = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().min(1),
        marks: z.number().min(0).nonnegative(),
        choices: z.tuple([z.string(), z.string(), z.string(), z.string()]),
      }),
    )
    .min(1),
  title: z.string(),
  subject: z.string(),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  origin: z.string(),
});

export const registerFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  type: z.enum(["STUDENT", "TEACHER"]),
  password: z.string().min(8).max(16),
});
