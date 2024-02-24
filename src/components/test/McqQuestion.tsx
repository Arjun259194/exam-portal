import { Question } from "@/utils/classes";
import { Trash2, X } from "lucide-react";
import React, { FC } from "react";

type Props = Question & {
  onCancel: () => void;
};

export const McqQuestion: FC<Props> = ({
  onCancel,
  question,
  marks,
  choices,
}) => (
  <div className="relative group ">
    <div className="w-full p-3 my-2 space-y-5 shadow-sm border border-gray-300 rounded-md">
      <div className="flex justify-between items-center">
        <span className="text-xl capitalize">{question}</span>
        <span className="text-gray-500 text-sm">Marks:{marks}</span>
      </div>
      <div className="flex justify-around w-full">
        {choices.map((choice, index) => (
          <span className="shadow-sm px-4 py-2 rounded-md border border-gray-500">
            {String.fromCharCode(97 + index).toUpperCase()}. {choice}
          </span>
        ))}
      </div>
    </div>
    <button
      onClick={onCancel}
      className="absolute hidden group-hover:block [&&]:mt-0 bg-red-600 rounded-full p-2 -top-5 -right-5 "
    >
      <Trash2 className="text-white" />
    </button>
  </div>
);
