import db, { prisma } from "@/database";
import { FC } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import Title from "@/components/UI/Title";

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

const page: FC<Props> = async ({ params: { id: answerID } }) => {
  const { user, answer, test } = await fetchData(answerID);
  if (test.type === "MCQ") {
    return (
      <div>
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

        <div className="p-2">
          {test.questions.map((q, i) => {
            return (
              <article className="w-full space-y-5 shadow-sm border border-gray-200  p-5 rounded-md">
                <div className="flex justify-between items-center text-lg capitalize">
                  <p className="text-lg">{q.question}</p>
                  <span className="text-sm">{q.marks}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {q.choices.map((c, j) => {
                    // TODO: Map answers to the question
                    const choice = String.fromCharCode(97 + j) + "." + c;
                    return (
                      <div
                        className={`flex ${answer.answers[i] === choice ? "border-gray-300" : ""} border-2 border-gray-100 capitalize p-1 rounded-md hover:bg-green-100 text-lg space-x-2`}
                      >
                        {choice}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
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
