"use client";

import { useEffect, useState } from "react";
import Button from "../UI/Button";

type Props = {
  questions: {
    id: string;
    testId: string;
    question: string;
    marks: number;
    choices: string[];
  }[];
};

function newArr(n: number) {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push("");
  }
  return arr;
}

const McqAttempForm: React.FC<Props> = (test) => {
  const [answer, setAnswer] = useState(newArr(test.questions.length - 1));

  useEffect(() => console.log(answer), [answer]);

  function submitionHandler() {

    //TODO

  }

  return (
    <form className="space-y-2 w-3/4 mx-auto">
      {test.questions.map((q, i) => {
        return (
          <article className="w-full shadow-md p-2 rounded-md">
            <div className="flex justify-between items-center text-lg">
              <p className="text-lg">{q.question}</p>
              <span className="text-sm">{q.marks}</span>
            </div>
            <div className="flex justify-evenly items-center">
              {q.choices.map((c, j) => {
                return (
                  <div className="flex space-x-2">
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
                      {String.fromCharCode(97 + j) + "." + c}
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
