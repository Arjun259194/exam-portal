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
  const userID = getUserId();

  if (!userID) redirect("/auth/login")

  const user = await db.user.findById(userID).catch((error) => {
    console.error(error);
    redirect("/auth/login");
  });

  if (!user) {
    redirect("/auth/login");
  } else {
    return user;
  }
}

export const handle = <FnReturnType>(fn: () => FnReturnType) => {
  try {
    return fn()
  } catch (error) {
    console.error(error);
  }
}



