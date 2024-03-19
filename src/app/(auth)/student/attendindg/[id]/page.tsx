import McqAttempForm from "@/components/test/McqAttempForm";
import db, { prisma } from "@/database";
import { redirect } from "next/navigation";
import React from "react";
import action from "./action";
import { getSessionUser, getUserId } from "@/utils";

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
  const user = await getSessionUser()
  if (user.type === "TEACHER") redirect("/dashboard")
  const res = await prisma.attendedTest.findFirst({
    where: {
      userID: user.id,
      testID: id
    }
  })
  if (res) redirect("/dashboard")

  const test = await db.test.get(id)
  if (!test) redirect("/message?message=Test+is+not+found&state=err")

  return { user, test } as const
}

const page = async ({ params: { id } }: Props) => {
  const { test, user } = await fetchData(id)
  return (
    <section className="container mx-auto py-5">
      {test.type === 'MCQ' ? (
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
      ) : (
        <>
          <p>Under Development</p>
        </>
      )}
    </section>
  );
};

export default page;
