'use client'
import IconButton from "@/components/UI/IconButton";
import { TestWritten } from "@/types";
import { WrittenAnswer } from "@prisma/client";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  test: TestWritten;
  answer: WrittenAnswer;
  action: (arg1: FormData) => Promise<void>;
}

function newArr(n: number): number[] {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    arr.push(0);
  }
  return arr;
}

export default function WrittenTestScoring(props: Props) {
  const [result, setResult] = useState(newArr(props.test.questions.length));

  const getFormData = () => {
    const f = new FormData();
    f.set("result", JSON.stringify(result));
    f.set("answerID", props.answer.id);
    return f;
  };

  return (
    <section className="grid grid-cols-3 p-2 gap-2">
      <div className="p-1 min-h-screen col-span-2">
        <object className="rounded-md" data={"/" + props.answer.path.split('/').at(-1)} type="application/pdf" width="100%" height="100%">
          <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
        </object>
      </div>
      <div className="p-1 space-y-2 overflow-y-auto">
        <h3>Total score: {result.reduce((prev, curr) => prev + curr, 0)}</h3>
        {props.test.questions.map((q, i) => {
          const ii = i + 1;
          return (
            <div
              key={i}
              className="flex p-2 rounded-md flex-col space-y-2 ring-2 ring-gray-300"
            >
              <label className="capitalize" htmlFor={`${ii}`}>
                Score for quesion {ii}
              </label>
              <hr />
              <input
                className="outline-none border-2 border-gray-300 rounded-md p-0.5"
                value={result[i]}
                onChange={(e) => {
                  const marks = parseInt(e.target.value);
                  if (marks > q.marks) {
                    toast.error("question is for " + q.marks + " marks");
                  } else {
                    let newarr = [...result];
                    newarr[i] = marks;
                    setResult((_) => newarr);
                  }

                  if (result[i] > props.test.questions[i].marks) {
                    toast.error(
                      "question is for " +
                      props.test.questions[i].marks +
                      " marks",
                    );
                  }
                }}
                type="number"
              />
            </div>
          );
        })}
        <IconButton
          Icon={Send}
          onClick={() => {
            const f = getFormData();

            f.set('result', JSON.stringify(result))
            f.set('testID', props.test.id)
            f.set('answerID', props.answer.id)

            const p = props.action(f);

            toast.promise(p, {
              loading: "Processing..",
              error: "Someting went wrong",
              success: () => {
                window.location.href = `/test/info/${props.answer.writtenTestId}`;
                return "Done";
              },
            });
          }}
        >
          Submit
        </IconButton>
      </div>
    </section>
  );
}
