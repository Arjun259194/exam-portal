import { Choices } from "@/types";

export class Question { //TODO: change to MCQTest using vscode change feature so it's change in all the files
  public question: string
  public marks: number
  public choices: Choices
  constructor() {
    this.marks = 0;
    this.question = "";
    this.choices = ["", "", "", ""];
  }
}

export class WrittenQuesions {
  public question: string
  public marks: number
  constructor() {
    this.question = ""
    this.marks = 0
  }
}
