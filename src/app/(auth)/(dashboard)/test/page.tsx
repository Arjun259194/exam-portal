import Card from "@/components/Card";
import IconButton from "@/components/UI/IconButton";
import db from "@/database";
import { AuthCookie } from "@/lib/cookie";
import { JWTToken } from "@/lib/jwt";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const token = AuthCookie.getToken()!;
  const userId = JWTToken.valid(token);
  if (!userId) redirect("/auth/login");
  const user = await db.user.findById(userId);
  if (!user) redirect("/auth/login");
  const res = await db.test.getMany();
  if (!res) redirect("/message");

  return (
    <div className="">
      {user.type === "TEACHER" ? (
        <>
          <div className="flex py-5 justify-between">
            <h1 className="text-4xl capitalize ">Available Tests</h1>
            <Link href="/test/mcq/new">
              <IconButton Icon={Plus} reverse={false}>
                Create New
              </IconButton>
            </Link>
          </div>
        </>
      ) : null}

      <div className="grid grid-cols-3 gap-5">
        {res.map(
          (props, i) => {
            return (
              <Card.Test
                key={i}
                type="MCQ"
                {...props}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default page;
