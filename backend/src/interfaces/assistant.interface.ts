export type Assistant = {
  id: number;
  name: string;
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  finalQuestions?: FinalQuestion[];
  published: boolean;
  updatedAt: Date;
  createdAt: Date;
};

export type PublicAssistant = {
  app: string;
  assistantId: string;
  question: string;
  startText: string;
  submitText: string;
  finalQuestions: FinalQuestion[];
  hash: string;
};

export type PublicAssistantSummary = {
  app: string;
  name: string;
  question: string;
};

export type FinalQuestion = {
  id?: number;
  assistantId?: number;
  question: string;
  answers?: FinalAnswer[];
};

export type FinalAnswer = {
  id?: number;
  questionId?: number;
  value: string;
  output: string;
};

export enum BackgroundColor {
  Vattjom = 'vattjom',
  Grönsta = 'gronsta',
  Björnstigen = 'bjornstigen',
  Juniskär = 'juniskar',
}
