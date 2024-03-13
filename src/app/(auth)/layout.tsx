import { getUserId } from "@/utils";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const token = AuthCookie.getToken();
  // console.log("THis is token: ", token);
  // if (!token) redirect("/auth/login");
  // const userId = JWTToken.valid(token) as string;
  // console.log("This is userID:", userId)
  // const user = await db.user.findById(userId);
  // if (!user) redirect("/auth/register");
  //// Code ubove is not needed not but it was used to authorize user
  const userID =  getUserId()
  if(!userID) return redirect("/auth/login")
  return <>{children}</>;
}
