import NewWrittenForm from "@/components/test/written/NewWrittenForm";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getSessionUser();
  if (user.type === "STUDENT") redirect("/dashboard");
  return (
    <div>
      <NewWrittenForm />
    </div>
  );
}
