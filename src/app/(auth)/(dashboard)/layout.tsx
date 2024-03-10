import { SideBar } from "@/components/UI/SideBar";
import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = AuthCookie.value!;
  const userID = JWTToken.valid(token)!;
  const user = await db.user.findById(userID);
  if (!user) {
    redirect("/message");
  }
  const { password, ...u } = user;
  return (
    <>
      <div className="grid grid-cols-6">
        <SideBar {...u} />
        <main className="col-span-5 overflow-y-auto max-h-screen px-10 py-3">{children}</main>
      </div>
    </>
  );
}
