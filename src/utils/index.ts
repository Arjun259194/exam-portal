import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export function getUserId() {
  const token = AuthCookie.getToken();
  if (!!token) {
    const userId = JWTToken.valid(token);
    if (!!userId) {
      return userId;
    }
  }
  redirect("/auth/login")
}

export async function getSessionUser() {
  console.log("Getting Session Data...");
  const userID = getUserId();
  console.log("Got user id: ", userID);

  if (!userID) redirect("/auth/login")

  const user = await db.user.findById(userID).catch((error) => {
    console.error("error while fetching user: ", error);
    redirect("/auth/login");
  });

  if (!user) {
    console.log("User not found in Database");
    redirect("/auth/login");
  } else {
    console.log("Got user info: ", user);
    return user;
  }
}
