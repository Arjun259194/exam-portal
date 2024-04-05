import NewTypingForm from "@/components/test/typing/NewTypingForm"
import { getSessionUser } from "@/utils"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getSessionUser()
  if (user.type === "STUDENT") redirect("/dashboard")

  return <div>
    <NewTypingForm />
  </div>
}
