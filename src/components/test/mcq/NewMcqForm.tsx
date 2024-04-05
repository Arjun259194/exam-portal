"use client";

import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import McqQuestions from "./McqQuestions";
import { MCQQuesion } from "@/utils/classes";
import { ClassName, Choices } from "@/types";
import { Plus, Send } from "lucide-react";
import IconButton from "../../UI/IconButton";
import axios from "axios";

function NewMcqForm() {
  const [formState, setFormState] = useState<MCQQuesion>(new MCQQuesion());
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [questions, setQuestions] = useState<Array<MCQQuesion>>([]);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [withholdDate, setWithholdDate] = useState<string>("");

  const addQuestion = (q: MCQQuesion) => setQuestions([...questions, q]);

  const optionChangeHandler = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setFormState((prevState) => {
      const newOptions: Choices = [...prevState.choices];
      newOptions[index] = value;
      return { ...prevState, choices: newOptions } satisfies MCQQuesion;
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!formState.choices.includes(formState.correctAnswer))
      return toast.error("Correct answer not matching the choices");

    addQuestion(formState);
    setFormState(new MCQQuesion());
  };

  const createTest = async () => {
    const releaseAt = new Date(releaseDate);
    const withholdAt = new Date(withholdDate);

    const time1 = releaseAt.getTime();
    const time2 = withholdAt.getTime();

    if (time1 >= time2) {
      return toast.error(
        "Release date can't be same or greater then withhold date",
      );
    }

    const p = axios.post("/api/mcq/test/new", { title, subject, questions, releaseDate: releaseAt, withholdDate: withholdAt });
    await toast.promise(p, {
      loading: "Processing...",
      success: () => {
        window.location.href = "/test";
        return "successfully created";
      },
      error: "Something went wrong",
    });
  };

  const inputStyle: ClassName = "border border-gray-300 rounded-md p-2 mb-4";

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <form onSubmit={submitHandler} className="mb-8">
          <div className="grid border-2 border-gray-200 rounded-lg p-2 grid-cols-4">
            <label className="col-span-3" htmlFor="title">
              Test Title
            </label>
            <label className="" htmlFor="subject">
              Subject Name
            </label>
            <input
              required
              id="title"
              className={`${inputStyle} col-span-3`}
              onChange={(e) => setTitle((_) => e.target.value)}
              value={title}
              name="title"
              type="text"
              placeholder="Mid sem test"
            />
            <input
              required
              className={`${inputStyle}`}
              id="subject"
              onChange={(e) => setSubject((_) => e.target.value)}
              name="marks"
              value={subject}
              type="text"
              placeholder="Maths"
            />

            <div className="flex col-span-full flex-col p-2">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                onChange={(e) => {
                  setReleaseDate((_) => e.target.value);
                }}
                value={releaseDate}
                className="block w-full rounded-md border  border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="releaseDate"
                type="datetime-local"
              />
            </div>

            <div className="flex flex-col p-2 col-span-full">
              <label htmlFor="withholdDate">Withhold Date</label>
              <input
                onChange={(e) => {
                  setWithholdDate((_) => e.target.value);
                }}
                value={withholdDate}
                className="block w-full rounded-md border  border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="releaseDate"
                type="datetime-local"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 p-2">
            <label className="col-span-3" htmlFor="question">
              Question
            </label>
            <label className="" htmlFor="marks">
              Marks
            </label>
            <input
              required
              id="question"
              className={`${inputStyle} col-span-3`}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, question: e.target.value }))
              }
              value={formState.question}
              name="question"
              type="text"
              placeholder="Enter your question"
            />
            <input
              required
              className={`${inputStyle}`}
              id="marks"
              onChange={(e) => {
                const { value } = e.target;
                setFormState({
                  ...formState,
                  marks: value === "" ? 0 : parseInt(value),
                });
              }}
              name="marks"
              value={formState.marks}
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              placeholder="Enter marks"
            />
          </div>
          <div className="grid grid-cols-4 gap-1 p-2">
            <label className="col-span-4" htmlFor="option_1">
              Choices
            </label>
            {formState.choices.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                name={`option_${index}`}
                id={`option_${index}`}
                onChange={(e) => optionChangeHandler(index, e)}
                placeholder={`Option ${index + 1}`}
                className={`${inputStyle}`}
                required
              />
            ))}
          </div>
          <div className="flex flex-col w-full p-2">
            <label className="" htmlFor="correctAnswer">
              Correct answer
            </label>
            <input
              required
              className={`${inputStyle}`}
              id="correctAnswer"
              onChange={(e) => {
                const { value } = e.target;
                setFormState((prev) => ({ ...prev, correctAnswer: value }));
              }}
              name="correctAnswer"
              value={formState.correctAnswer}
              type="text"
              placeholder="Enter correct choice"
            />
          </div>

          <div className="w-full justify-between flex items-center gap-3">
            <IconButton
              Icon={Plus}
              type="submit"
              variant="secondary"
              reverse={false}
            >
              Add question
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                createTest();
              }}
              disabled={questions.length <= 0}
              Icon={Send}
              variant="primary"
              reverse={false}
            >
              Create
            </IconButton>
          </div>
        </form>

        <McqQuestions
          update={(q) => {
            setQuestions(q);
          }}
          questions={questions}
        />
      </div>
    </>
  );
}

export default NewMcqForm;
