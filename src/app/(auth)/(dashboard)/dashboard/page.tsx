import Card from "@/components/Card";
import db from "@/database";
import { redirect } from "next/navigation";

const page = async () => {
  const { written, mcq } = await db.test.getMany();
  const CONDITION = mcq.length <= 0 && written.length <= 0;
  if (CONDITION) redirect("/message");

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
            <div className="min-h-36 flex py-2 overflow-x-auto overflow-y-hidden">
              {mcq.length <= 0 ? (
                <p>No Mcq Test Available, try refreshing</p>
              ) : (
                mcq.map((q, index) => {
                  return <Card.Test type="MCQ" key={index} {...q} />;
                })
              )}
            </div>
            <div className="min-h-36 flex py-2 overflow-x-auto overflow-y-hidden">
              {written.length <= 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>No Written Test Available, try refreshing</p>
                  </div>
              ) : (
                written.map((q, index) => {
                  return <Card.Test type="WRITTEN" key={index} {...q} />;
                })
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default page;
