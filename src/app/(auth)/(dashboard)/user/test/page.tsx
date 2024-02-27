import IconButton from "@/components/UI/IconButton";
import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const token = AuthCookie.getToken()!;
  const userId = JWTToken.valid(token);
  if (!userId) redirect("/auth/login");
  const user = await db.user.findById(userId);
  if (!user || user.type !== "TEACHER") redirect("/auth/login");
  const res = await db.mcq.getMany(userId);
  if (!res) redirect("/message");

  return (
    <div className="">
      <div className="flex py-5 justify-between">
        <h1 className="text-4xl capitalize ">Available Tests</h1>
        <Link href="/test/mcq/new">
          <IconButton Icon={Plus} reverse={false}>
            Create New
          </IconButton>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {res.map((test, i) => {
          return (
            <Link key={i} href={`/test?testID=${test.id}`}>
              <div
                key={i}
                className="w-full p-3 my-2 hover:shadow-xl hover:shadow-green-200 space-y-3 shadow-sm border border-gray-300 rounded-md"
              >
                <p>Test ID: {test.id}</p>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-center">
                    <span>{test.questions.length}</span>
                    <span className="text-sm text-center capitalize underline text-gray-600 hover:text-gray-800">
                      Total questions
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>
                      {test.questions
                        .map((q) => q.marks)
                        .reduce((prev, curr) => prev + curr)}
                    </span>
                    <span className="text-sm text-center capitalize underline text-gray-600 hover:text-gray-800">
                      Total Marks{" "}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
