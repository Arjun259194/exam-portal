import db from "@/database";
import { redirect } from "next/navigation";
import { getUserId } from "@/utils";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userID = getUserId()!;

  const user = await db.user.findById(userID);

  if (!user) return redirect("/login");

  if (user.type !== "STUDENT") return redirect("/dashboard");

  return <>{children}</>;
}
