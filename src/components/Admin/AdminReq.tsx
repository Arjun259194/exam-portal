"use client";

import { Check, Trash, UserRoundX } from "lucide-react";
import toast from "react-hot-toast";


interface Props {
  dataNState: PromiseSettledResult<
    {
      id: string;
      email: string;
      username: string;
      password: string;
    }[]
  >;
  acceptFn: (arg1: FormData) => Promise<void>;
  rejectFn: (arg1: FormData) => Promise<void>;
}


async function errWrapper(fn: () => Promise<void>) {
  try {
    return await fn()
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong")
  }
}

export default function AdminReq({ dataNState, acceptFn, rejectFn }: Props) {
  return (
    <div className="comic-box-black col-span-2 rounded-lg p-1 border-2 border-black rounde">
      <h2 className="capitalize font-semibold text-lg">Teacher request</h2>
      <hr />
      <div className="max-h-48 min-h-48 overflow-y-auto space-y-2">
        {dataNState.status === "rejected" || dataNState.value.length <= 0 ? (
          <div className="flex flex-col items-center p-5 h-full justify-center">
            <UserRoundX className="w-8 h-8" />
            <p className="text-center text-lg">Not available</p>
          </div>
        ) : (
          <>
            {dataNState.value.map((r, i) => (
              <div
                className="border group flex items-center justify-between border-gray-300  p-1 rounded-md"
                key={i}
              >
                <div>
                  <p className="capitalize">{r.username}</p>
                  <p className="text-sm text-gray-600">{r.email}</p>
                </div>
                <div className="space-x-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-200 ease-in">
                  <button
                    className="text-red-600 rounded-full p-0.5 "
                    onClick={async () => {
                      errWrapper(async () => {
                        const f = new FormData();
                        f.set("id", r.id);
                        await rejectFn(f);
                      })
                    }}
                  >
                    <Trash />
                  </button>
                  <button
                    className="text-green-600 rounded-full p-0.5 "
                    onClick={async () => {
                      errWrapper(async () => {
                        const f = new FormData();
                        f.set("id", r.id);
                        f.set("origin", window.location.origin)
                        await acceptFn(f);
                      })
                    }}
                  >
                    <Check />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
