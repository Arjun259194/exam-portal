'use client'
import { ClassName } from "@/types";
import { WrittenQuestion } from "@/utils/classes";
import React, { useState } from "react";
import IconButton from "../../UI/IconButton";
import { Plus, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";


export default function NewWrittenForm() {
  const [formState, setFormState] = useState<WrittenQuestion>(
    new WrittenQuestion(),
  );
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [questions, setQuestions] = useState<Array<WrittenQuestion>>([]);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [withholdDate, setWithholdDate] = useState<string>("");

  const inputStyle: ClassName = "border border-gray-300 rounded-md p-2 mb-4";

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setQuestions([...questions, formState]);
    setFormState(new WrittenQuestion());
  };

  function createTest() {
    const releaseAt = new Date(releaseDate);
    const withholdAt = new Date(withholdDate);

    const time1 = releaseAt.getTime();
    const time2 = withholdAt.getTime();

    if (time1 >= time2) {
      return toast.error(
        "Release date can't be same or greater then withhold date",
      );
    }

    const p = axios.post("/api/written/new", {
      title,
      subject,
      releaseDate,
      withholdDate,
      questions,
    });

    toast.promise(p, {
      loading: "Proceccing...",
      error: (err) => {
        console.log(err)
        return "Someting went wrong"
      },
      success: () => {
        window.location.href = "/dashboard";
        return "successfully created";
      },
    });
  }

  return (
    <div className="grid grid-cols-2">
      <form onSubmit={submitHandler} action="">
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
      <section className="p-2 space-y-3">
        {questions.map((q) => (
          <article className="flex items-center rounded-lg ring-2 ring-gray-300 shadow-md w-full p-2 justify-between">
            <p className="capitalize">{q.question}</p>
            <span className="text-sm text-gray-500">{q.marks} marks</span>
          </article>
        ))}
      </section>
    </div>
  );
}

