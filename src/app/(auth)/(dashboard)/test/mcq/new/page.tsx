import NewMcqForm from "@/components/test/NewMcqForm";
import db from "@/database";
import { JWTToken } from "@/lib/jwt";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

async function page() {
  const authCookie = cookies().get("auth");
  if (!authCookie) redirect("/auth/login");

  const userID = JWTToken.valid(authCookie.value)
  if (!userID) redirect('/message')

  const user = await db.user.findById(userID).catch(err => {
    console.log("Error while fetchin user", err)
    redirect("/message")
  })

  if (!user) redirect("/message")

  if (user.type == "STUDENT") redirect("/")

  return (
    <div className="container mx-auto">
      <NewMcqForm />
    </div>
  )
}

export default page
