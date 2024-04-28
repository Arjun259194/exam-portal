import { TestMcq } from "@/types";
import React from "react";

interface Props extends TestMcq { }

const McqAnswerInspect: React.FC<Props> = async (props) => {
   const { questions, answers, title, subject } = props;

   const TOTALMARKS = questions.reduce((prev, curr) => prev + curr.marks, 0);
   const TOTALQUESIONS = questions.length;
   const TOTALATTENDEDSTUDENTS = answers.length;

   return (
      <section className="min-h-screen">
         <div className="space-y-3">
            <h1 className="capitalize text-4xl font-semibold">{title}</h1>
            <div className="flex space-x-3">
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

         <section>
            <h2>Attended By {TOTALATTENDEDSTUDENTS} students</h2>
            {answers.map((a) => {
               return (
                  <article>
                     <p>
                        Submited by <span>{a.user.username}</span>
                     </p>
                  </article>
               );
            })}
         </section>
      </section>
   );
};

export default McqAnswerInspect;
