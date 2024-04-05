import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils";
import CreateTestButton from "@/components/test/CreateTestButton";
import Tests from "@/components/test/Tests";

const page = async () => {
  const user = await getSessionUser();
  if (user.type !== "TEACHER") redirect("/dashboard");
  return (
    <div>
      <div className="flex py-5 justify-between">
        <h1 className="text-4xl capitalize ">Available Tests</h1>
        <CreateTestButton />
      </div>
      <Tests user={user} />
    </div>
  );
};

export default page;
