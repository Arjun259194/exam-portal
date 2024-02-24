import { Choices } from "@/types";

export class Question {
    public question: string;
    public marks: number;
    public choices: Choices;

    constructor() {
        this.marks = 0;
        this.question = ""
        this.choices = ['', '', '', '']
    }
}

