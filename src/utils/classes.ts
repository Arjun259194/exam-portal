import { Options } from "@/types";

export class Question {
    public question: string;
    public marks: number;
    public options: Options;

    constructor() {
        this.marks = 0;
        this.question = ""
        this.options = ['', '', '', '']
    }
}

