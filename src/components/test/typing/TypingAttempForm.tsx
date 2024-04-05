"use client";

import Button from "@/components/UI/Button";
import { TestTyping } from "@/types";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  action: (formdata: FormData) => Promise<void>;
  test: TestTyping;
  userID: string;
};

function newArr(n: number): string[] {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push("");
  }
  return arr;
}

const TypingAttempForm: React.FC<Props> = ({ test, action, userID }) => {
  const [answers, setAnswers] = useState(newArr(test.questions.length - 1));

  const validate = () => answers.filter(Boolean).length === answers.length;

  const getFormData = () => {
    const formData = new FormData();
    formData.set("answers", JSON.stringify(answers));
    formData.set("testId", test.id);
    formData.set("userId", userID);
    return formData;
  };

  function submitHandler() {
    if (!validate()) {
      return toast.error("Please attempt all the questions");
    }

    const f = getFormData();

    const p = action(f);

    toast.promise(p, {
      loading: "Processing..",
      error: "Something went wrong",
      success: () => {
        window.location.href = "/dashboard";
        return "Done";
      },
    });
  }

  return (
    <form onSubmit={submitHandler} className="w-3/4 mx-auto space-y-3">
      {test.questions.map((q, i) => {
        return (
          <article className="w-full space-y-5 shadow-sm border border-gray-800  p-5 rounded-md">
            <div className="flex justify-between items-center text-lg capitalize">
              <p className="text-lg">{q.question}</p>
              <span className="text-sm">{q.marks}</span>
            </div>
            <textarea
              value={answers[i]}
              onChange={(e) => {
                const newarr = [...answers];
                newarr[i] = e.target.value;
                setAnswers((_) => {
                  return newarr;
                });
              }}
              className="w-full min-h-48 rounded-md p-1 outline-none ring-2 ring-gray-300"
            ></textarea>
          </article>
        );
      })}
      <Button className="capitalize" variant="primary">
        submit
      </Button>
    </form>
  );
};

export default TypingAttempForm;
