import AdminReq from "@/components/Admin/AdminReq";
import Side from "@/components/Admin/Side";
import db, { prisma } from "@/database";
import { getSessionUser } from "@/utils";
import { accept, reject } from "./action";
import User from "@/components/Admin/User";
import Tests from "@/components/Admin/Tests";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getSessionUser();
  if (user.type !== "ADMIN") redirect("/dashboard")

  const requests = [
    db.user.all(),
    db.test.getMany(),
    prisma.teacherRequest.findMany(),
  ] as const;

  const responses = await Promise.allSettled(requests);

  const [usersState, testsState, adminReqState] = responses;

  return (
    <div className="grid bg-gray-800 gap-3 grid-cols-6">
      <Side user={user} />
      <div className="col-span-5 bg-gray-100 m-2 rounded-2xl overflow-y-auto p-2 space-y-8">
        <section className="w-full max-h-56 min-h-56 grid gap-3 grid-cols-6">
          <AdminReq
            acceptFn={accept}
            rejectFn={reject}
            dataNState={adminReqState}
          />
          <User usersState={usersState} />
        </section>
        <section className="w-full grid gap-3 min-h-72 max-h-72">
          <Tests testsState={testsState} />
        </section>
      </div>
    </div>
  );
}
