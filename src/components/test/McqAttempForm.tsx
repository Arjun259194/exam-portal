"use client";

import { FormEvent, useState } from "react";
import Button from "../UI/Button";
import toast from "react-hot-toast";
import { TestMcq } from "@/types";

type Props = {
  action: (formdata: FormData) => Promise<void>;
  test: TestMcq
  userID: string
};

function newArr(n: number): string[] {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push("");
  }
  return arr;
}

const McqAttempForm: React.FC<Props> = ({ test, action, userID }) => {
  const [answer, setAnswer] = useState(newArr(test.questions.length - 1));

  const validate = () => answer.filter(Boolean).length === answer.length;

  const getFormData = () => {
    const formData = new FormData();
    formData.set("answers", JSON.stringify(answer));
    formData.set("testId", test.id);
    formData.set('userId', userID)
    return formData
  }

  async function submitionHandler(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Give answers to all the questions before submitting");
      return;
    }
    const formData = getFormData()
    try {
      toast.loading("Processing...");
      await action(formData);
      toast.dismiss();
      toast.success("Done!");
    } catch (error) {
      toast.dismiss();
      toast.error("There was an error");
    }
  }

  return (
    <form onSubmit={submitionHandler} className="space-y-3 w-3/4 mx-auto">
      {test.questions.map((q, i) => {
        return (
          <article className="w-full space-y-5 shadow-sm border border-gray-200  p-5 rounded-md">
            <div className="flex justify-between items-center text-lg capitalize">
              <p className="text-lg">{q.question}</p>
              <span className="text-sm">{q.marks}</span>
            </div>
            {/* <div className="flex justify-evenly items-center"> */}
            <div className="grid grid-cols-2 gap-2">
              {q.choices.map((c, j) => {
                return (
                  <div className="flex capitalize p-1 rounded-md hover:bg-green-100 text-lg space-x-2">
                    <input
                      type="radio"
                      value={String.fromCharCode(97 + j) + "." + c}
                      name={`${i}`}
                      id={`${j}${i}`}
                      checked={
                        `${String.fromCharCode(97 + j)}.${c}` === answer[i]
                      }
                      onChange={(e) => {
                        const newar = [...answer];
                        newar[i] = e.target.value;
                        setAnswer((_) => {
                          return newar;
                        });
                      }}
                    />
                    <label htmlFor={`${j}${i}`}>
                      {String.fromCharCode(97 + j) + ". " + c}
                    </label>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
      <Button className="capitalize" variant="primary">
        submit
      </Button>
    </form>
  );
};

export default McqAttempForm;
