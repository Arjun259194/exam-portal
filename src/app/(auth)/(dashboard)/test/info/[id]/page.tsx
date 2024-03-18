import db from "@/database";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import McqAnswerInspect from "@/components/test/McqAnswerInspect";
import WrittenAnswerInspect from "@/components/test/WrittenAnswerInspect";

interface Props {
  params: {
    id: string;
  };
}

const page: React.FC<Props> = async (props) => {
  const user = await getSessionUser();
  if (user.type !== "TEACHER") redirect("/dashboard");
  const tests = await db.test.get(props.params.id);
  const [mcq, written] = tests;
  if (!mcq && !written)
    return (
      <div>
        <p>Not found</p>
      </div>
    );
  if (!!mcq) return <McqAnswerInspect {...mcq} />;
  if (!!written) return <WrittenAnswerInspect {...written} />; //TODO: create this Component
  return <div>Something went wrong</div>;
};

export default page;
