"use server";
import db from "@/database";
import { getUserId } from "@/utils";
import { redirect } from "next/navigation";

async function page() {
  const userID = getUserId();
  if (!userID) redirect("/auth/login");

  const user = await db.user.findById(userID);

  if (!user)
    return (
      <div>
        <p>something went wrong, can't fetch user information</p>
      </div>
    );

  const { type, email, password, username } = user;

  return <div className="">{/*TODO*/}</div>;
  // create a profile page
}

export default page;
