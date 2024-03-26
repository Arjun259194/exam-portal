'use client'
import { TestMcq } from "@/types";
import { MCQAnswer } from "@prisma/client";
import { Box } from "lucide-react";

type Props = {
  test: TestMcq
  answer: MCQAnswer
}

const McqTestScoring = ({ test, answer }: Props) => {
  return <div className="p-2 grid grid-cols-3">
    <div className="col-span-2 space-y-2">
      <span className="text-lg  font-semibold">Answers given by the student</span>
      {test.questions.map((q, i) => {
        return (
          <Box className="w-full space-y-5 p-5 rounded-md">
            <div className="flex justify-between items-center text-lg capitalize">
              <p className="text-lg">{q.question}</p>
              <span className="text-sm">{q.marks}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {q.choices.map((c, j) => {
                const choice = String.fromCharCode(97 + j) + "." + c;
                return (
                  <div
                    className={`flex ${answer.answers[i] === choice ? "border-green-300 shadow-green-300 shadow-sm" : "border-gray-100"} border-2 border-gray-100 capitalize p-1 rounded-md hover:bg-green-100 text-lg space-x-2`}
                  >
                    {choice}
                  </div>
                );
              })}
            </div>
          </Box>
        );
      })}
    </div>
    <div>
      <span>Inspection area</span>
    </div>
  </div>
}

export default McqTestScoring;
