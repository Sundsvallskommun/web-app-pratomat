import { FinalQuestion } from "./final-question.interface";

export type PublicAssistant = {
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  finalQuestions: FinalQuestion[];
  hash: string;
  backgroundColor?: string;
};

export type PublicAssistantSummary = {
  app: string;
  name: string;
  question: string;
};
