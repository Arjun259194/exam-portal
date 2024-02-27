import { SideBar } from "@/components/UI/SideBar";

export default async function dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grid grid-cols-6">
        <SideBar />
        <main className="col-span-5 overflow-y-auto px-10">{children}</main>
      </div>
    </>
  );
}
