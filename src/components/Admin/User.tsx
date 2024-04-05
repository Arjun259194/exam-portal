"use client";

import { removeUser } from "@/app/(auth)/admin/action";
import { $Enums } from "@prisma/client";
import { Trash, UserRoundX } from "lucide-react";
import toast from "react-hot-toast";
import Tag from "../UI/Tag";

interface Props {
  usersState: PromiseSettledResult<
    {
      id: string;
      username: string;
      email: string;
      password: string;
      type: $Enums.UserType;
    }[]
  >;
}

async function errWrapper(fn: () => Promise<void>) {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
}

export default function User({ usersState }: Props) {
  return (
    <div className="col-span-4 comic-box-black border-2 border-black p-1 rounded-lg">
      <div className="flex items-center justify-between mx-2">
        <h2 className="capitalize font-semibold text-lg">User</h2>
        <span>
          {usersState.status === "rejected" || usersState.value.length <= 0
            ? `0`
            : `${usersState.value.length}`}
        </span>
      </div>
      <hr />
      {usersState.status === "rejected" || usersState.value.length <= 0 ? (
        <div className="flex p-5  flex-col items-center justify-center text-center ">
          <UserRoundX className="w-8 h-8" />
          <p>Can't find any</p>
          <p>try refreshing the page</p>
        </div>
      ) : (
        <div className="space-y-3 p-2 overflow-y-auto max-h-48 min-h-48">
          {usersState.value.map((u, i) => (
            <article
              className="comic-box-black flex items-center justify-between p-1 rounded-lg border-2 border-black"
              key={i}
            >
              <div>
                <div className="w-full space-x-3">
                  <span className="text-lg capitalize ">{u.username}</span>
                  <Tag
                    color={
                      u.type === "TEACHER"
                        ? "blue"
                        : u.type === "STUDENT"
                          ? "green"
                          : "red"
                    }
                  >
                    {u.type}
                  </Tag>
                </div>
                <p className="text-gray-600 text-sm">{u.email}</p>
              </div>
              <button
                onClick={() => {
                  errWrapper(async () => {
                    const f = new FormData();
                    f.set("id", u.id);
                    const p = removeUser(f);
                    toast.promise(p, {
                      loading: "Processing...",
                      success: "Request rejected",
                      error: "Something went wrong"
                    })
                  });
                }}
                className=""
              >
                <Trash />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
