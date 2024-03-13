import db from "@/database";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const t = await db.test.get(params.id);
  if (!t) return redirect("/test");

  return (
    <>
      <section className="">
        <h1 className="capitalize text-4xl font-semibold">{t.title}</h1>
        <div className="text-lg capitalize">
          <span>by {t.creater.username}</span>{" "}
          <span>Subject {t.subject}</span>
        </div>
        <div>

          {t.type === "MCQ" ? <>

          </> : <>

            </>}

        </div>
      </section>
    </>
  );
};

export default page;
