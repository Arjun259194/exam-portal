import db from "@/database";
import Button from "../UI/Button";
import Link from "next/link";

type Test = Awaited<ReturnType<typeof db.mcq.getMany>>[number];

type Props = Test & {
  type: "MCQ" | "Written";
};

const Test: React.FC<Props> = ({
  id,
  user: { username },
  subject,
  title,
  type,
  questions,
}) => {
  const totalMarks = questions.reduce((prev, curr) => prev + curr.marks, 0);
  const totalQuestions = questions.length;
  return (
    <article className="flex items-start shadow-md py-3 px-5 space-y-3 border border-gray-200 rounded-md m-1 min-w-64 flex-col">
      <h2 className="text-lg capitalize text-gray-800 font-semibold">
        {title}
      </h2>
      <div className="space-x-2">
        <span className="capitalize text-gray-500">{username}</span>
        <span
          className={`text-sm px-2 py-0.5 rounded-lg border-2 text-blue-400 capitalize ${
            type === "MCQ" ? "border-blue-400" : "border-green-400"
          }`}
        >
          {subject}
        </span>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="p-2 rounded-lg flex flex-col items-center bg-gray-100 border border-gray-200 text-center text-sm">
          <span className="font-semibold">{totalMarks}</span>
          <span className="text-sm capitalize">total marks</span>
        </div>
        <div className="p-2 rounded-lg flex flex-col items-center bg-gray-100 border border-gray-200 text-center text-sm">
          <span className="font-semibold">{totalQuestions}</span>
          <span className="text-sm capitalize">total questions</span>
        </div>
      </div>
      <Link href={`/test/${id}/attend`}>
        <Button variant="secondary">Apply</Button>
      </Link>
    </article>
  );
};

export default Test;
