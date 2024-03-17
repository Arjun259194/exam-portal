import db from "@/database";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const [mcq, written] = await db.test.get(params.id);
  if (!mcq && !written) return redirect("/test");

  return (
    <>
      <section className="">
        {!written ? (
          <>
            <div>
              <h1 className="capitalize text-4xl font-semibold">{mcq.title}</h1>
              <div className="text-lg capitalize">
                <span>by {mcq.creater.username}</span>{" "}
                <span>Subject {mcq.subject}</span>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default page;
