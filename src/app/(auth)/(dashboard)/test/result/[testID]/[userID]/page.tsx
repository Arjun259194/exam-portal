import Table from "@/components/UI/Table";
import db, { prisma } from "@/database";
import { getSessionUser } from "@/utils";
import { Record } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
   params: {
      testID: string;
      userID: string;
   };
}

const page = async ({ params: { testID, userID } }: Props) => {
   const user = await getSessionUser();
   const result = await prisma.result.findFirst({
      where: {
         testId: testID,
         userId: userID,
      },
      include: {
         user: true,
      },
   });

   if (result && (user.type === "TEACHER" || user.id === result.userId)) {
      const test = await db.test.get(result.testId);
      return (
         <div className="w-10/12 mx-auto space-y-4">
            <section>
               <h1 className="text-xl capitalize font-semibold">
                  Result of {test?.title} for {result.user.username}
               </h1>
               <div>
                  <span>
                     Total Marks gained: {result.gainedMarks}/{result.totalMarks}
                  </span>
               </div>
            </section>
            <section>
               <Table
                  data={result.marksPerQuestion.map((m, i) => {
                     let data: Record<string, any> = {
                        "Question No.": i + 1,
                        question:
                           test?.type === "MCQ"
                              ? test.questions[i].question
                              : test?.type == "TYPING"
                                 ? test.questions[i].question
                                 : test?.questions[i].question,
                        marks: m,
                     };

                     if (test?.type === "MCQ") {
                        data["Correct Answer"] = test.questions[i].correctAnswer;
                     }

                     return data;
                  })}
               />
            </section>
         </div>
      );
   } else {
      redirect("/dashboard");
   }
};

export default page;
