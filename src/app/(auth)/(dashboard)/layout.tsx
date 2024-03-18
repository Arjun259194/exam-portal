import { SideBar } from "@/components/UI/SideBar";
import { getSessionUser } from "@/utils";

export default async function dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser()
  const { password, ...u } = user
  return (
    <>
      <div className="grid grid-cols-6">
        <SideBar {...u} />
        <main className="col-span-5 overflow-y-auto max-h-screen px-10 py-3">{children}</main>
      </div>
    </>
  );
}
