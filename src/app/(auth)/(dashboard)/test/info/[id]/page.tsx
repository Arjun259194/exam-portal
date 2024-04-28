import db from "@/database";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import McqTestInspect from "@/components/test/mcq/McqTestInspect";
import WrittenAnswerInspect from "@/components/test/written/WrittenAnswerInspect";
import { Metadata } from "next";
import { checkMcqTest, submitTypingTestResult } from "./action";
import TypingTestInspect from "@/components/test/typing/TypingTestInspect";

interface Props {
   params: {
      id: string;
   };
}

export const metadata: Metadata = {
   title: "Inspect Test",
   description: "make your exams easy",
};

async function fetchData(id: string) {
   const user = await getSessionUser();
   if (user.type !== "TEACHER") redirect("/dashboard");
   const test = await db.test.get(id);
   if (!test) redirect("/message&message=test+not+found&state=err");
   return { user, test } as const;
}

const page: React.FC<Props> = async (props: any) => {
   const { test } = await fetchData(props.params.id);
   if (test.type === "MCQ")
      return <McqTestInspect action={checkMcqTest} {...test} />;
   else if (test.type == "TYPING")
      return <TypingTestInspect action={submitTypingTestResult} {...test} />;
   return <WrittenAnswerInspect {...test} />;
};

export default page;
