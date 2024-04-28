import Link from "next/link";
import { CommonTestProps } from "@/types";
import { User } from "@prisma/client";

type Props = CommonTestProps & {
   user: User;
   disable?: boolean;
};

const Test = (props: Props) => {
   const link =
      props.user.type === "STUDENT"
         ? `/student/attendindg/${props.id}`
         : `/test/info/${props.id}`;

   const jsx = (
      <article className="flex items-start py-3 px-5 comic-box-black space-y-3 border border-black rounded-md m-1 min-w-64 flex-col">
         <h2 className="text-lg capitalize text-gray-800 font-semibold">
            {props.title}
         </h2>
         <div className="space-x-2">
            <span className="capitalize text-gray-500">
               {props.creater.username}
            </span>
            <span
               className={`text-sm px-2 py-0.5 rounded-lg border-2 text-blue-400 capitalize ${props.type === "MCQ"
                     ? "text-blue-400 border-blue-400"
                     : "text-green-400 border-green-400"
                  }`}
            >
               {props.subject}
            </span>
         </div>
      </article>
   );

   if (!props.disable || props.user.type === "TEACHER")
      return <Link href={link}>{jsx}</Link>;
   else return jsx;
};

export default Test;
