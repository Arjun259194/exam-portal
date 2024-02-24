import LogoutButton from "@/components/Auth/LogoutButton";
import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = AuthCookie.getToken();
  if (!token) redirect("/auth/login");
  const userId = JWTToken.valid(token) as string;
  const user = await db.user.findById(userId);
  if (!user) {
    redirect("/auth/register");
  }
  return (
    <>
      <header className=" bg-green-500 text-white capitalize py-2">
        <div className="flex justify-between items-center w-3/4 mx-auto">
          <h1 className="capitalize font-bold text-3xl underline">Examify</h1>
          <nav>
            <ul className="flex gap-5 items-center">
              {user.type === "TEACHER" ? (
                <Link href="/user/test">
                  <li>Test</li>
                </Link>
              ) : null}
              <Link href="/">
                <li>Home</li>
              </Link>
              <Link href="/about">
                <li>About</li>
              </Link>
              <LogoutButton variant="primary" />
            </ul>
          </nav>
        </div>
      </header>

      {children}
    </>
  );
}
