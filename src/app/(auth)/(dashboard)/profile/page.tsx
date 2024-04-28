"use server";
import StudentProfile from "@/components/Profile/StudentProfile";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

async function page() {
   const user = await getSessionUser();

   if (user.type !== "STUDENT") redirect("/dashboard")

   return (
      <div className="">
         <section className="space-y-3 flex flex-col items-end w-full">
            <div className="flex">
               <span className="text-sm text-gray-500">As a {user.type}</span>
               <h2 className="text-4xl font-semibold underline capitalize">
                  {user.username}{" "}
               </h2>
            </div>
            <p>{user.email}</p>
         </section>
         <StudentProfile user={user} />
      </div>
   );
}

export default page;
