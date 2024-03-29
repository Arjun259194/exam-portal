import Button from "../UI/Button";
import Link from "next/link";
import { TestMcq, TestWritten, UserRole } from "@/types";
import IconButton from "../UI/IconButton";
import { ChevronRight } from "lucide-react";

type Props = (TestMcq | TestWritten) & {
  userRole: UserRole;
};

const Test = (props: Props) => {
  const { id, questions, title, subject, creater, type, userRole } = props;
  const totalMarks =
    type === "MCQ"
      ? questions.reduce((prev, curr) => prev + curr.marks, 0)
      : questions.reduce((prev, curr) => prev + curr.marks, 0);
  const totalQuestions = questions.length;
  return (
    <article className="flex items-start py-3 px-5 comic-box-black space-y-3 border border-black rounded-md m-1 min-w-64 flex-col">
      <h2 className="text-lg capitalize text-gray-800 font-semibold">
        {title}
      </h2>
      <div className="space-x-2">
        <span className="capitalize text-gray-500">{creater.username}</span>
        <span
          className={`text-sm px-2 py-0.5 rounded-lg border-2 text-blue-400 capitalize ${type === "MCQ" ? "border-blue-400" : "border-green-400"
            }`}
        >
          {subject}
        </span>
      </div>
      <div className="flex w-full space-x-2 items-center">
        <div className="p-2 rounded-lg flex items-center bg-gray-100 border border-gray-200 text-center text-sm">
          <span className="font-semibold">{totalMarks}</span>
          <span className="text-sm capitalize mx-1">total marks</span>
        </div>
        <div className="p-2 rounded-lg flex items-center bg-gray-100 border border-gray-200 text-center text-sm">
          <span className="font-semibold">{totalQuestions}</span>{" "}
          <span className="text-sm capitalize mx-1">total questions</span>
        </div>
      </div>
      {userRole === "STUDENT" && (
        <Link href={`/student/attendindg/${id}/`}>
          <Button variant="secondary">Apply</Button>
        </Link>
      )}
      {userRole === "TEACHER" && (
        <Link href={`/test/info/${id}/`}>
          <IconButton reverse Icon={ChevronRight} variant="secondary">
            More
          </IconButton>
        </Link>
      )}
    </article>
  );
};

export default Test;
