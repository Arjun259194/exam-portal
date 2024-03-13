import { Question } from "@/utils/classes";
import { McqQuestion } from "./McqQuestion";
import { AlertOctagon } from "lucide-react";

interface Props {
  questions: Question[];
  update: (arg1: Question[]) => void;
}

const McqQuestions: React.FC<Props> = ({ questions, update }) => (
  <div className="overflow-y-auto mx-2 max-h-screen min-h-screen">
    {questions.length <= 0 ? (
      <div className="text-2xl flex flex-col items-center justify-center h-screen text-center font-bold mb-4">
        <AlertOctagon className="aspect-square h-28 w-28" />
        <h1>No questions added yet!</h1>
      </div>
    ) : (
      questions.map((state, index) =>
        state ? (
          <McqQuestion
            onCancel={() => {
              const newArr = questions.filter((_, i) => i !== index);
              update(newArr);
            }}
            key={index}
            {...state}
          />
        ) : null,
      )
    )}
  </div>
);

export default McqQuestions;
