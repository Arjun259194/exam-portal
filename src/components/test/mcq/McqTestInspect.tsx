"use client";

import { TestMcq } from "@/types";
import React from "react";
import IconButton from "../../UI/IconButton";
import { Search } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Props extends TestMcq {
   action: (arg1: FormData) => Promise<void>;
}

const McqTestInspect = async (props: Props) => {
   const { questions, answers, title, subject } = props;

   const TOTALMARKS = questions.reduce((prev, curr) => prev + curr.marks, 0);
   const TOTALQUESIONS = questions.length;
   const TOTALATTENDEDSTUDENTS = answers.length;

   return (
      <section className="min-h-screen space-y-4">
         <div className="space-y-3">
            <h1 className="capitalize text-4xl font-semibold">{title}</h1>

            <div className="flex space-x-4">
               <p className="py-1 px-2 rounded-md border border-green-400 text-green-400 w-fit capitalize font-semibold">
                  {subject}
               </p>

               <p className="py-1 px-2 rounded-md border border-green-400 text-green-400 w-fit capitalize font-semibold">
                  Total Marks {TOTALMARKS}
               </p>

               <p className="py-1 px-2 rounded-md border border-green-400 text-green-400 w-fit capitalize font-semibold">
                  Total questions {TOTALQUESIONS}
               </p>
            </div>
         </div>

         <section className="w-full">
            <h2 className="text-2xl capitalize">
               Attended By {TOTALATTENDEDSTUDENTS} students
            </h2>

            {answers.length <= 0 ? (
               <>
                  <div className="w-full p-10 flex flex-col space-y-3 items-center justify-center">
                     <h1 className="text-4xl capitalize font-semibold">
                        No one has submitted this test yet!
                     </h1>
                     <p className="text-xl text-gray-500">
                        Check other test or wait for students submission
                     </p>
                  </div>
               </>
            ) : (
               <>
                  <div className="p-1 grid grid-cols-3">
                     {answers.map((a) => {
                        return (
                           <article className="shadow-md border space-y-3 border-gray-200 rounded-md py-1 px-2">
                              <div className="flex flex-col space-y-1">
                                 <span className="font-semibold capitalize text-2xl underline underline-offset-2">
                                    {a.user.username}
                                 </span>

                                 <span className="text-base text-gray-600 ">
                                    {a.user.email}
                                 </span>
                              </div>

                              <div className="w-full p-1">
                                 {a.checked && (
                                    <span className="px-4 text-gray-800 py-1 border-2 border-green-400 rounded-lg capitalize">
                                       <Link href={`/test/result/${a.testId}/${a.userId}`}>
                                          Check
                                       </Link>
                                    </span>
                                 )}
                                 {!a.checked && (
                                    <IconButton
                                       onClick={async () => {
                                          const f = new FormData();
                                          f.set("id", a.id);
                                          const p = props.action(f);
                                          toast.promise(p, {
                                             loading: "Processing...",
                                             error: "Failed to check the test",
                                             success: "Test checked and mail sent",
                                          });
                                       }}
                                       className="w-full text-center flex items-center justify-center"
                                       variant="secondary"
                                       Icon={Search}
                                    >
                                       Check
                                    </IconButton>
                                 )}
                              </div>
                           </article>
                        );
                     })}
                  </div>
               </>
            )}
         </section>
      </section>
   );
};

export default McqTestInspect;
