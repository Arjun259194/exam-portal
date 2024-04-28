"use client";

import { Tests } from "@/types";
import { Trash } from "lucide-react";
import Tag from "../UI/Tag";
import { removeTest } from "@/app/(auth)/admin/action";
import toast from "react-hot-toast";

interface Props {
   tests: Tests["written"];
}

export default function Written({ tests }: Props) {
   return (
      <div className="h-full p-2 space-y-3 overflow-y-auto">
         <h2>Written:</h2>
         {tests.length <= 0 ? (
            <div className="flex items-center justify-between h-full">
               <span className="mx-auto font-semibold text-lg p-10">
                  No written test found
               </span>
            </div>
         ) : (
            tests.map((wt, i) => {
               return (
                  <div
                     key={i}
                     className="flex comic-box-black rounded-md p-1 border-2 border-black items-center justify-between "
                  >
                     <div>
                        <p className="capitalize text-lg">
                           {wt.title}
                           {"  "}
                           <Tag color="blue">{wt.subject}</Tag>
                        </p>
                        <p className="text-sm text-gray-600">{wt.creater.username}</p>
                     </div>
                  </div>
               );
            })
         )}
      </div>
   );
}
