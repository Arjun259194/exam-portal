import db, { prisma } from "@/database";
import { FC } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import Title from "@/components/UI/Title";
import McqTestScoring from "@/components/test/McqTestScoring";

interface Props {
  params: {
    id: string;
  };
}

async function fetchData(answerID: string) {
  const user = await getSessionUser();
  if (user.type === "STUDENT") redirect("/dashboard");

  const answer = await prisma.mCQAnswer.findFirst({
    where: { id: answerID },
    include: { user: true },
  });
  if (!answer) redirect("/message?message=Answer+is+not+found&state=err");

  const test = await db.test.get(answer.testId);
  if (!test) redirect("/message?message=Answer+is+not+found&state=err");

  return { user: { ...user, type: "TEACHER" }, answer, test } as const;
}

const page: FC<Props> = async ({ params: { id: answerID } }: Props) => {
  const { user, answer, test } = await fetchData(answerID);
  if (test.type === "MCQ") {
    return (
      <div>
        <div className="text-center space-y-2">
          <Title>Inspecting Answer</Title>
          <p>
            Solution to{" "}
            <q className="capitalize underline underline-offset-2 decoration-2 decoration-green-600">
              {test.title}
            </q>{" "}
            by{" "}
            <span className="underline underline-offset-2 decoration-green-600 decoration-2">
              {answer.user.username}
            </span>
          </p>

        </div>

        <McqTestScoring test={test} answer={answer} />
      </div>
    );
  }

  return (
    <div>
      {answer.answers.map((s) => (
        <p>{s}</p>
      ))}
    </div>
  );
};

export default page;
