import db from "@/database";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params
}: {
  params: {
    testId: string
  }
}) => {
  const {  testId } = params;
  if (!testId) redirect("/message?state=err&message=Not+valid+testid");

  const test = await db.mcq.get(testId);
  if (!test) {
    return (
      <section className="flex flex-col items-center justify-center capitalize">
        <h1>Failed to fetch data</h1>
        <p>
          There was an issue fetching data, please try agian or check the link
        </p>
      </section>
    );
  }
  return (
    <div className="w-2/3 mx-auto">
      {test.questions.map(({ choices, marks, question }, i) => {
        return (
          <div key={i} className="w-full p-3 my-2 space-y-5 shadow-sm border border-gray-300 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xl capitalize">{question}</span>
              <span className="text-gray-500 text-sm">Marks:{marks}</span>
            </div>
            <div className="flex justify-around w-full">
              {choices.map((choice, index) => (
                <span className="shadow-sm px-4 py-2 rounded-md border border-gray-500">
                  {String.fromCharCode(97 + index).toUpperCase()}. {choice}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
