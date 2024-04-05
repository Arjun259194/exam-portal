import db from "@/database";
import { User } from "@prisma/client";
import Card from "../Card";

export default async function Tests({ user }: { user: User }) {
  let tests = await db.test.getManyCommon();

  if (user.type === "TEACHER") {
    tests = tests.filter((t) => t.creater.id === user.id);
  }

  const CONDITION = tests.length <= 0;

  const today = new Date();

  const notReleasedTest = tests.filter((t) => t.releaseAt > today);
  const releasedTest = tests.filter(
    (t) => today > t.releaseAt && today < t.withholdAt,
  );
  const notAvailableTest = tests.filter((t) => today > t.withholdAt);

  return (
    <>
      <section className="w-full space-y-5 p-2 rounded-md ">
        {CONDITION ? (
          <div className="flex items-center justify-center h-10">
            <p className="capitalize underline underline-offset-4 font-semibold">
              No Tests to be found
            </p>
          </div>
        ) : (
          <>
            <div className="min-h-36 grid grid-cols-3 gap-2 py-2 overflow-x-auto overflow-y-hidden">
              <div className=" rounded-md overflow-hidden">
                <h2 className=" bg-yellow-500 p-2 text-lg capitalize text-white">
                  Not Ready
                </h2>
                <div className="space-y-2 max-h-screen p-1 py-2 overflow-y-auto">
                  {notReleasedTest.map((t) => (
                    <Card.Test user={user} disable {...t} />
                  ))}{" "}
                </div>
              </div>
              <div className=" rounded-md overflow-hidden">
                <h2 className=" bg-green-500 p-2 text-lg capitalize text-white">
                  Ready
                </h2>
                <div className="space-y-3 max-h-screen p-1 py-2 h-full overflow-y-auto">
                  {releasedTest.map((t) => (
                    <Card.Test user={user} {...t} />
                  ))}
                </div>
              </div>
              <div className=" rounded-md overflow-hidden">
                <h2 className=" bg-red-500 p-2 text-lg capitalize text-white">
                  Not available
                </h2>
                <div className="space-y-2 p-1 py-2 overflow-y-auto">
                  {notAvailableTest.map((t) => (
                    <Card.Test disable user={user} {...t} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
