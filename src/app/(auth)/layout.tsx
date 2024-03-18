import { getUserId } from "@/utils";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  getUserId()
  // if(!userID) return redirect("/auth/login")
  return <>{children}</>;
}
