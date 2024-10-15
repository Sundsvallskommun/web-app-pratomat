export interface Answer {
  value: string;
  output: string;
}

export interface FinalQuestion {
  question: string;
  answers: Answer[];
}
