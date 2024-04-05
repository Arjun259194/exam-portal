import NewMcqForm from "@/components/test/mcq/NewMcqForm";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

async function page() {
  const user = await getSessionUser()
  if (user.type == "STUDENT") redirect("/")

  return (
    <div className="container mx-auto">
      <NewMcqForm />
    </div>
  )
}

export default page
