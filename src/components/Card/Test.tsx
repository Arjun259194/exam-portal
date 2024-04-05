import Button from "../UI/Button";
import Link from "next/link";
import { CommonTestProps } from "@/types";
import IconButton from "../UI/IconButton";
import { ChevronRight } from "lucide-react";
import { User } from "@prisma/client";

type Props = CommonTestProps & {
  disable?: boolean
  user: User
};

const Test = (props: Props) => {
  return (
    <article className="flex items-start py-3 px-5 comic-box-black space-y-3 border border-black rounded-md m-1 min-w-64 flex-col">
      <h2 className="text-lg capitalize text-gray-800 font-semibold">
        {props.title}
      </h2>
      <div className="space-x-2">
        <span className="capitalize text-gray-500">
          {props.creater.username}
        </span>
        <span
          className={`text-sm px-2 py-0.5 rounded-lg border-2 text-blue-400 capitalize ${props.type === "MCQ" ? "text-blue-400 border-blue-400" : "text-green-400 border-green-400"
            }`}
        >
          {props.subject}
        </span>
      </div>
      {(props.user.type === "STUDENT" && !props.disable) ? (
        <Link href={`/student/attendindg/${props.id}/`}>
          <Button variant="secondary">Apply</Button>
        </Link>) : null
      }
      {(props.user.type === "TEACHER" && !props.disable) ? (
        <Link href={`/test/info/${props.id}/`}>
          <IconButton reverse Icon={ChevronRight} variant="secondary">
            More
          </IconButton>
        </Link>
      ) : null}
    </article>
  );
};

export default Test;
