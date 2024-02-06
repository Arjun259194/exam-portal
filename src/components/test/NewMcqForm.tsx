"use client"

import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import Button from "../UI/Button"
import { McqQuestion } from "./McqQuestion";
import { Question } from "@/utils/classes";
import { ClassName, Options } from "@/types";


function NewMcqForm() {
    const [question, setQuestion] = useState<Question>(new Question());
    const [formState, setFormState] = useState<Array<Question>>([])

    const addQuestion = (q: Question) => setFormState([...formState, q])

    const changeHandler: ChangeEventHandler<HTMLInputElement> = event => {
        event.preventDefault();
        const { name, value } = event.target
        setQuestion(prevState => {
            return { [name]: value, ...prevState }
        })
    }

    const optionChangeHandler = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setQuestion((prevState) => {
            const newOptions: Options = [...prevState.options]
            newOptions[index] = value;
            return { ...prevState, options: newOptions } satisfies Question
        })
    }

    const submitHansler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        addQuestion(question)
        setQuestion(new Question())
    }

    const inputStyle: ClassName = ""


    return (
        <>
            {formState.length <= 0 ?
                <h1>Please add question</h1>
                : formState.map(state => {
                    return state ? <McqQuestion {...state} />
                        : null
                })}

            <form onSubmit={submitHansler}>
                <input className={inputStyle} onChange={changeHandler} name="question" type="text" />
                <input onChange={changeHandler} name="marks" type="number" />
                <div>
                    {
                        question.options.map((option, index) => {
                            return <input type="text" value={option} name={`option_${index}`} onChange={e => optionChangeHandler(index, e)} />
                        })
                    }
                </div>
                <Button type="submit" variant="primary">AddMore</Button>
            </form>

        </>
    )
}

export default NewMcqForm
