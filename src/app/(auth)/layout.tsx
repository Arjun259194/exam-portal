import { getUserId } from "@/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userID =  getUserId()
  if(!userID) return redirect("/auth/login")
  return <>{children}</>;
}
