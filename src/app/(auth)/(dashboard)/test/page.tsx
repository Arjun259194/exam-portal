import Card from "@/components/Card";
import IconButton from "@/components/UI/IconButton";
import db from "@/database";
import { getUserId } from "@/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const userId = getUserId()
  if(!userId) redirect("/login")

  const user = await db.user.findById(userId);
  if (!user) redirect("/auth/login");

  const {mcq, written} = await db.test.getMany();

  const CONDITION = mcq.length <= 0 && written.length <= 0
  if (CONDITION) redirect("/message");

  return (
    <div className="">
      {user.type === "TEACHER" ? (
        <>
          <div className="flex py-5 justify-between">
            <h1 className="text-4xl capitalize ">Available Tests</h1>
            <Link href="/test/mcq/new">
              <IconButton Icon={Plus} reverse={false}>
                Create New
              </IconButton>
            </Link>
          </div>
        </>
      ) : null}

      <div className="grid grid-cols-3 gap-5">
        {mcq.map(
          (props, i) => {
            return (
              <Card.Test
                key={i}
                type="MCQ"
                {...props}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default page;
