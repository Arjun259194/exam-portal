import db from "@/database";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const test = await db.test.get(id);
  if (!test) redirect("/deshboard");
  const type = test.type;
  return (
    <section className="container mx-auto py-5">
      <div>
        <h1 className="text-4xl font-semibold capitalize ">{test.title}</h1>
        <div className="flex items-center space-x-2 capitalize">
          <span className="font-semibold">
            by <span className="font-normal">{test.creater.username}</span>
          </span>
          <span className="font-semibold">
            on <span className="font-normal">{test.subject}</span>
          </span>
        </div>
      </div>
      {type === "MCQ" ? (
        <>
          <div>
            <div className="space-y-4">
              <p className="text-lg">
                Note: This is a mulitple choice question test. This test will
                contains question with multiple choices and you as a student
                will have to choose the right choice in order to get the marks.
                read the points given below and follow the rules.
              </p>
              <ul className="list-decimal px-10">
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
                  {test.questions.reduce((prev, curr) => prev + curr.marks, 0)}
                </p>
              </div>

              <form className="space-y-2 w-3/4 mx-auto">
                {test.questions.map((q) => {
                  return (
                    <article className="w-full shadow-md p-2 rounded-md">
                      <div className="flex justify-between items-center text-lg">
                        <p className="text-lg">{q.question}</p>
                        <span className="text-sm">{q.marks}</span>
                      </div>
                      <div className="flex justify-evenly items-center">
                        {q.choices.map((c, index) => {
                          return (
                            <span>
                              {String.fromCharCode(97 + index)}.{c}
                            </span>
                          );
                        })}
                      </div>
                    </article>
                  );
                })}
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default page;
