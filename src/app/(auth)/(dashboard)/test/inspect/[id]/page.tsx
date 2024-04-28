import db, { prisma } from "@/database";
import { FC } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import Title from "@/components/UI/Title";
import TypingTestScoring from "@/components/test/typing/TypingTestScoring";
import { tCheck, wCheck } from "./action";
import WrittenTestScoring from "@/components/test/written/WrittenTestScoring";

interface Props {
   params: {
      id: string;
   };
}

async function fetchData(answerID: string) {
   const user = await getSessionUser();
   if (user.type === "STUDENT") redirect("/dashboard");

   const typingAnswer = await prisma.typeingAnswer.findFirst({
      where: { id: answerID },
      include: { user: true },
   });

   if (typingAnswer) {
      const test = await db.test.get(typingAnswer.testID);
      if (!test) return redirect("/message?message=Test+Not+Found");
      return {
         user: { ...user, type: "TEACHER" },
         answer: typingAnswer,
         test,
         type: "TYPING",
      } as const;
   }

   const writtenAnswer = await prisma.writtenAnswer.findFirst({
      where: { id: answerID },
      include: { user: true },
   });

   if (writtenAnswer) {
      const test = await db.test.get(writtenAnswer.writtenTestId);
      if (!test) return redirect("/message?message=Test+Not+Found");
      return {
         user: { ...user, type: "TEACHER" },
         answer: writtenAnswer,
         test,
         type: "WRITTEN",
      } as const;
   } else {
      redirect("/message?message=Answer+is+not+found&state=err");
   }
}

const page: FC<Props> = async ({ params: { id: answerID } }: Props) => {
   const { user, answer, test, type } = await fetchData(answerID);
   if (test.type == "TYPING" && type === "TYPING") {
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
            <TypingTestScoring action={tCheck} test={test} answer={answer} />
         </div>
      );
   } else if (test.type === "WRITTEN" && type === "WRITTEN") {
      return (
         <div>
            <div className="text-center space-y-2">
               <h1 className="font-semibold">Inspecting Answer</h1>
               <p className="text-sm">
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
            <WrittenTestScoring action={wCheck} test={test} answer={answer} />
         </div>
      );
   }
};

export default page;
