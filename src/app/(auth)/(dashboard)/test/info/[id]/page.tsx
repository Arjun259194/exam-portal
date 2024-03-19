import db from "@/database";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import McqTestInspect from "@/components/test/McqTestInspect";
import WrittenAnswerInspect from "@/components/test/WrittenAnswerInspect";
import { Metadata } from "next";

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
  if (!test) redirect("/message&message=test+not+found&state=err")
  return { user, test } as const
}

const page: React.FC<Props> = async (props: any) => {
  const { test } = await fetchData(props.params.id)
  if (test.type === "MCQ") return <McqTestInspect  {...test} />;
  else return <WrittenAnswerInspect {...test} />; //TODO: create this Component
};

export default page;
