import db, { prisma } from "@/database";
import { User } from "@prisma/client";
import React from "react";
import PieChart from "../UI/Charts/PieChart";
import BarChart from "../UI/Charts/BarChart";
import IconButton from "../UI/IconButton";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Button from "../UI/Button";

interface Props {
   user: User;
}

const StudentProfile = async (props: Props) => {
   const result = await prisma.result.findMany({
      where: {
         userId: props.user.id,
      },
   });

   const [t, w, m] = await Promise.all([
      prisma.typingTest.count(),
      prisma.writtenTest.count(),
      prisma.mCQTest.count(),
   ]);

   const allTestsCount = t + w + m;

   const atteptedTestsCount = await prisma.attendedTest.count({
      where: {
         userID: props.user.id,
      },
   });

   const resultData = await Promise.all(
      result.map(async (r) => {
         const test = await db.test.get(r.testId);
         return {
            ...r,
            test: test,
         };
      }),
   );

   const allMcqResult = resultData.filter((r) => r.test?.type === "MCQ");
   const allWrittenResult = resultData.filter((r) => r.test?.type === "WRITTEN");
   const allTypingResult = resultData.filter((r) => r.test?.type === "TYPING");

   const pieData = [
      {
         title: "Mcq",
         data: allMcqResult.map((r) => r.gainedMarks).reduce((p, c) => p + c, 0),
      },
      {
         title: "Written",
         data: allWrittenResult
            .map((r) => r.gainedMarks)
            .reduce((p, c) => p + c, 0),
      },
      {
         title: "Typing",
         data: allTypingResult
            .map((r) => r.gainedMarks)
            .reduce((p, c) => p + c, 0),
      },
   ];

   const barData = [
      { title: "Total Tests", data: allTestsCount },
      { title: "Attepted Tests", data: atteptedTestsCount },
   ];

   return (
      <section className="space-y-4">
         <h3 className="text-3xl capitalize font-semibold">
            total test given - {resultData.length}
         </h3>
         <div className="grid items-center grid-cols-7 p-1">
            <div className="col-span-3 max-h-[500px] min-h-[500px] space-y-3 overflow-auto p-2 flex items-center flex-col">
               {resultData.map((r, i) => {
                  return (
                     <div
                        key={i}
                        className="w-full p-2 border border-green-200 hover:shadow-md transition-all duration-100 hover:border-2 hover:border-green-500 rounded-md"
                     >
                        <p>{r.test?.title}</p>
                        <span>
                           {r.gainedMarks}/{r.totalMarks}
                        </span>
                        <Link href={`/test/result/${r.testId}/${r.userId}`}>
                           <IconButton Icon={ArrowUpRight}>Go</IconButton>
                        </Link>
                     </div>
                  );
               })}
            </div>
            <div className="col-span-4 max-h-[500px] p-2 flex items-center flex-col">
               <span className="capitalize text-2xl font-semibold">
                  Total Marks gained: {result.reduce((p, c) => p + c.gainedMarks, 0)}
               </span>
               <PieChart data={pieData} />
            </div>
            <div className="col-span-3 max-h-[600px] p-2 flex items-center flex-col">
               <div>
                  <span className="capitalize text-2xl font-semibold">
                     Total test: {allTestsCount}
                  </span>
                  <p className="capitalize text-xl text-center ">
                     Missed : {allTestsCount - atteptedTestsCount}
                  </p>
               </div>
               <BarChart data={barData} />
            </div>
            <div className="col-span-4 flex flex-col items-center">
               <p className="text-3xl capitalize my-2">
                  Still {allTestsCount - atteptedTestsCount} remainin
               </p>
               <Link href="/dashboard">
                  <Button>Complete</Button>
               </Link>
            </div>
         </div>
      </section>
   );
};

export default StudentProfile;
