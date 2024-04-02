import Card from "@/components/Card";
import Title from "@/components/UI/Title";
import CreateTestButton from "@/components/test/CreateTestButton";
import db from "@/database";
import { getSessionUser } from "@/utils";

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

  const CONDITION = fMcq.length > 0 || fWritten.length > 0;

  console.log("test page condition: ", CONDITION)

  return (
    <div className="">
      {user.type === "TEACHER" ? (
        <>
          <div className="flex py-5 justify-between">
            <h1 className="text-4xl capitalize ">Available Tests</h1>
            {/* <Link href="/test/mcq/new"> */}
            {/*   <IconButton Icon={Plus} reverse={false}> */}
            {/*     Create New */}
            {/*   </IconButton> */}
            {/* </Link> */}
            <CreateTestButton />
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
          {/* <Link href="/test/mcq/new"> */}
          {/*   <IconButton variant="secondary" Icon={Plus} reverse={false}> */}
          {/*     Create New */}
          {/*   </IconButton> */}
          {/* </Link> */}
          <CreateTestButton />
        </div>
      )}
    </div>
  );
};

export default page;
