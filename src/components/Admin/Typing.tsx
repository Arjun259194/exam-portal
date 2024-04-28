
'use client'
import { Tests } from "@/types";
import { Trash } from "lucide-react";
import Tag from "../UI/Tag";
import toast from "react-hot-toast";
import { removeTest } from "@/app/(auth)/admin/action";

interface Props {
  tests: Tests['typing']
}

export default function Typing({ tests }: Props) {
  return <div className="h-full p-2 space-y-3 overflow-y-auto">
    <h2>Typing:</h2>
    {tests.length <= 0 ? (
      <div className="flex items-center justify-between h-full">
        <span className="mx-auto font-semibold text-lg p-10">
          No written test found
        </span>
      </div>
    ) : (
      tests.map((wt) => {
        return (
          <div className="flex comic-box-black rounded-md p-1 border-2 border-black items-center justify-between ">
            <div>
              <p className="capitalize text-lg">
                {wt.title}
                {"  "}
                <Tag color="blue">{wt.subject}</Tag>
              </p>
              <p className="text-sm text-gray-600">
                {wt.creater.username}
              </p>
            </div>
          </div>
        );
      })
    )}
  </div>
}
