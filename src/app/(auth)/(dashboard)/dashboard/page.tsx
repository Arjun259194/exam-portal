import Card from "@/components/Card";
import db from "@/database";

const page = async () => {
  const tests = await db.mcq.getMany();
  const isEmpty = !tests || tests.length <= 0 ? true : false;

  return (
    <>
      <section className="w-full space-y-5 p-2 rounded-md ">
        {isEmpty ? (
          <div className="flex items-center justify-center h-10">
            <p className="capitalize underline underline-offset-4 font-semibold">
              No Tests to be found
            </p>
          </div>
        ) : (
          <>
            <div className="min-h-36 flex py-2 overflow-x-auto overflow-y-hidden">
              {tests.map((q, index) => {
                return <Card.Test type="MCQ" key={index} {...q} />;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default page;
