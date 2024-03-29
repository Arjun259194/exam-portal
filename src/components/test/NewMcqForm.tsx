"use client";

import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import McqQuestions from "./McqQuestions";
import { Question } from "@/utils/classes";
import { ClassName, Choices } from "@/types";
import { Plus, RefreshCw, Send } from "lucide-react";
import IconButton from "../UI/IconButton";
import axios from "axios";

function NewMcqForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<Question>(new Question());
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const addQuestion = (q: Question) => setQuestions([...questions, q]);

  const optionChangeHandler = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setFormState((prevState) => {
      const newOptions: Choices = [...prevState.choices];
      newOptions[index] = value;
      return { ...prevState, choices: newOptions } satisfies Question;
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    addQuestion(formState);
    setFormState(new Question());
  };

  const createTest = async () => {
    setLoading(true);
    try {
      const p = axios.post("/api/mcq/test/new", { title, subject, questions });
      await toast.promise(p, {
        loading: "Processing...", success: "Test created", error: "Something went wrong",
      })
      window.location.href = "/test";
    } catch (error) {
      console.error(error);
      toast.error("Failed to create the test");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: ClassName = "border border-gray-300 rounded-md p-2 mb-4";

  return (
    <>
      {!!loading ? (
        <>
          <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center">
            <div className="bg-gray-100/90 aspect-square p-10 text-center capitalize font-semibold rounded-full">
              <RefreshCw className="animate-spin w-28 h-28" />
              <p className="text-xl">Loading...</p>
            </div>
          </div>
        </>
      ) : null}

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
          <div className="w-full justify-between flex items-center gap-3">
            <IconButton
              Icon={Plus}
              type="submit"
              variant="secondary"
              reverse={false}
            >
              {" "}
              Add question{" "}
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                createTest();
              }}
              disabled={questions.length <= 4}
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
