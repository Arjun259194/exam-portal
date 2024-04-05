import { Choices } from "@/types";

export class MCQQuesion { //TODO: change to MCQTest using vscode change feature so it's change in all the files
  public question: string
  public marks: number
  public choices: Choices
  public correctAnswer: string

  constructor() {
    this.marks = 0;
    this.question = "";
    this.choices = ["", "", "", ""];
    this.correctAnswer = ""
  }
}

export class TypingQuesion {
  public question: string
  public marks: number

  constructor() {
    this.question = ""
    this.marks = 0
  }
}


export class WrittenQuestion {
  public question: string
  public marks: number

  constructor() {
    this.question = ""
    this.marks = 0
  }
}
