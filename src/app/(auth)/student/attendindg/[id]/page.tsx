import McqAttempForm from "@/components/test/mcq/McqAttempForm";
import db, { prisma } from "@/database";
import { redirect } from "next/navigation";
import React from "react";
import action, { createTypingTest, createWrittenTestAnswer } from "./action";
import { getSessionUser } from "@/utils";
import TypingAttempForm from "@/components/test/typing/TypingAttempForm";
import WrittenAttemptForm from "@/components/test/written/WriitenAttemptForm";

type Props = {
  params: { id: string };
};

type BoilerProps = {
  title: string;
  username: string;
  subject: string;
};

function Boiler({ title, username, subject }: BoilerProps) {
  return (
    <div>
      <h1 className="text-4xl font-semibold capitalize">{title}</h1>
      <div className="flex items-center space-x-2 capitalize">
        <span className="font-semibold">
          by <span className="font-normal">{username}</span>
        </span>
        <span className="font-semibold">
          on <span className="font-normal">{subject}</span>
        </span>
      </div>
    </div>
  );
}

async function fetchData(id: string) {
  const user = await getSessionUser();
  if (user.type === "TEACHER") redirect("/dashboard");
  const res = await prisma.attendedTest.findFirst({
    where: {
      userID: user.id,
      testID: id,
    },
  });
  if (res) redirect("/dashboard");

  const test = await db.test.get(id);
  if (!test) redirect("/message?message=Test+is+not+found&state=err");

  return { user, test } as const;
}

const page = async ({ params: { id } }: Props) => {
  const { test, user } = await fetchData(id);
  return (
    <section className="container mx-auto py-5">
      {test.type === "MCQ" ? (
        <>
          <Boiler
            username={test.creater.username}
            title={test.title}
            subject={test.title}
          />
          <div>
            <div className="space-y-4">
              <p className="text-lg">
                Note: This is a mulitple choice question test. This test will
                contains question with multiple choices and you as a student
                will have to choose the right choice in order to get the marks.
                read the points given below and follow the rules.
              </p>
              <ul className="list-decimal capitalize px-10">
                <li>Read the question first before giving the answers.</li>
                <li>choose one answer for each question</li>
                <li>
                  after atempting all the questions use the apply button below
                  to submit the test
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-around w-full p-2 capitalize text-lg">
                <p>total question: {test.questions.length}</p>
                <p>
                  total marks:{" "}
                  {test.questions.reduce((prev, curr) => prev + curr.marks, 0)}{" "}
                </p>
              </div>
              <McqAttempForm userID={user.id} action={action} test={test} />
            </div>
          </div>
        </>
      ) : test.type === "TYPING" ? (
        <>
          <Boiler
            title={test.title}
            subject={test.subject}
            username={test.creater.username}
          />
          <div className="space-y-4">
            <p className="text-lg">
              Note: This is a typing test. You will be presented with questions
              or prompts. Type your answers directly into the designated text
              boxes below each question. Take your time, read carefully, and
              ensure your answers are clear and concise.
            </p>
            <p className="font-bold">Instructions:</p>
            <ul className="list-disc px-10">
              <li>Read the question or prompt thoroughly.</li>
              <li>
                Type your answer in the text box provided below each question.
              </li>
              <li>Proofread your answers before submitting the test.</li>
            </ul>
          </div>
          <div>
            <div>
              <div className="flex items-center justify-around w-full p-2 capitalize text-lg">
                <p>total question: {test.questions.length}</p>
                <p>
                  total marks:{" "}
                  {test.questions.reduce((prev, curr) => prev + curr.marks, 0)}{" "}
                </p>
              </div>
              <TypingAttempForm
                test={test}
                action={createTypingTest}
                userID={user.id}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Boiler
            title={test.title}
            subject={test.subject}
            username={test.creater.username}
          />
          <div className="space-y-4">
            <p className="text-lg">
              Note: This is a test where you will upload a PDF document
              containing your answers. Make sure your written answers are clear,
              concise, and well-organized within the PDF document.
            </p>
            <p className="font-bold">Instructions:</p>
            <ul className="list-disc px-10">
              <li>
                Prepare your written answers in a separate document (e.g., Word,
                PDF).
              </li>
              <li>
                Click "Browse" below and select the PDF document containing your
                answers.
              </li>
              <li>Ensure your answers correspond to the provided questions.</li>
              <li>Click "Submit" to upload your PDF and complete the test.</li>
            </ul>
          </div>
          <div className="w-ful flex items-center justify-center">
            <WrittenAttemptForm testId={test.id} action={createWrittenTestAnswer} />
          </div>
        </>
      )}
    </section>
  );
};

export default page;
