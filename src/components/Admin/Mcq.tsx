'use client'
import { Tests } from "@/types";
import { Trash } from "lucide-react";
import Tag from "../UI/Tag";
import toast from "react-hot-toast";
import { removeTest } from "@/app/(auth)/admin/action";

interface Props {
  tests: Tests['mcq']
}
export default function Mcq({ tests }: Props) {
  return <div className="h-full p-2 space-y-3 overflow-y-auto">
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
            <button onClick={async () => {
              const f = new FormData()
              f.set('id', wt.id)
              const p = removeTest(f)
              toast.promise(p, {
                loading: "Processing...",
                success: "Test removed with all the attached information",
                error: "Something went wrong"
              })
            }}><Trash className="hover:text-red-600" /></button>
          </div>
        );
      })
    )}
  </div>
}
