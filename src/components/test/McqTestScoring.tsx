"use client";
import { TestMcq } from "@/types";
import { MCQAnswer } from "@prisma/client";
import { Check, X } from "lucide-react";
import { useState } from "react";
import Button from "../UI/Button";
import check from "@/app/(auth)/(dashboard)/test/inspect/[id]/action";
import { toast } from "react-hot-toast";

type Props = {
  test: TestMcq;
  answer: MCQAnswer;
};

function newArr(n: number): boolean[] {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push(false);
  }
  return arr;
}

const McqTestScoring = ({ test, answer }: Props) => {
  const [score, setScore] = useState(newArr(test.questions.length - 1));
  return (
    <div className="col-span-2 space-y-2">
      <span className="text-lg  font-semibold">
        Answers given by the student
      </span>
      {test.questions.map((q, i) => {
        return (
          <div className="grid grid-cols-4">
            <div className="w-full space-y-5 col-span-3 p-5 rounded-md">
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
            </div>
            <div className="flex items-center justify-center space-y-1 flex-col">
              <p className="text-lg">Quesion: {i + 1}</p>
              <button
                h-2
                onClick={() => {
                  setScore((prev) => {
                    let newScore = [...prev];
                    newScore[i] = !newScore[i];
                    return newScore;
                  });
                }}
              >
                {score[i] ? (
                  <Check className="text-green-500 aspect-square h-20 w-20" />
                ) : (
                  <X className="text-red-500 aspect-square h-20 w-20" />
                )}
              </button>
            </div>
          </div>
        );
      })}
      <Button
        onClick={async () => {
          const f = new FormData();
          f.set("id", test.id);
          f.set("score", JSON.stringify(score));
          f.set('userID', answer.userId)
          //TODO: mark answer as checked
          const p = check(f);
          await toast.promise(p, {
            loading: "Processing...",
            success: "Test result sent to student",
            error: "Something went wrong",
          });
          window.location.href = "/dashboard";
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default McqTestScoring;
