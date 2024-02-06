import db from "@/database";
import { JWTToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  if (!token) {
    redirect("/auth/login");
  }
  const userId = JWTToken.valid(token.value) as string
  const user = await db.user.findById(userId)
  if (!user) {
    redirect("/auth/register")
  }
  return <>{children}</>;
}
