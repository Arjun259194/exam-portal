import Card from "@/components/Card";
import IconButton from "@/components/UI/IconButton";
import Title from "@/components/UI/Title";
import db from "@/database";
import { getSessionUser } from "@/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const user = await getSessionUser();
  const { mcq, written } = await db.test.getMany();
  const fMcq = mcq
    .filter((t) => t.createrId === user.id)
    .map((t) => {
      return { ...t, type: "MCQ" } as const;
    });
  const fWritten = written.filter((t) => t.createrId === user.id).map(t => {
    return { ...t, type: "WRITTEN" } as const
  })

  const CONDITION = fMcq.length <= 0 || fWritten.length <= 0;

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

      {CONDITION ? (
        <div className="grid grid-cols-3 gap-5">
          {[...fMcq, ...fWritten].map((props, i) => {
            return (
              <Card.Test userRole={user.type} key={i} {...props} />
            );
          })}
        </div>
      ) : (
        <div className="text-center flex items-center flex-col">
          {/* TODO: Make this better */}
          <Title>Hmm!</Title>
          <p>No Test created by you yet</p>
          <Link href="/test/mcq/new">
            <IconButton variant="secondary" Icon={Plus} reverse={false}>
              Create New
            </IconButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
