import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { FinalQuestion } from "../interfaces/final-question.interface";

interface AppStore {
  sessionId: string;
  setSessionId: (id: string) => void;
  question?: string;
  setQuestion: (question: string) => void;
  finalQuestions?: FinalQuestion[];
  setFinalQuestions: (finalQuestions: FinalQuestion[]) => void;
  startText?: string;
  setStartText: (startText: string) => void;
  submitText?: string;
  setSubmitText: (submitText: string) => void;
  backgroundColor?: string;
  setBackgroundColor: (color: string) => void;
}

export const useAppStore = createWithEqualityFn(
  persist<AppStore>(
    (set) => ({
      sessionId: "",
      setSessionId: (sessionId) => set(() => ({ sessionId })),
      question: undefined,
      setQuestion: (question) => set(() => ({ question })),
      finalQuestions: undefined,
      setFinalQuestions: (finalQuestions) => set(() => ({ finalQuestions })),
      startText: undefined,
      setStartText: (startText) => set(() => ({ startText })),
      submitText: undefined,
      setSubmitText: (submitText) => set(() => ({ submitText })),
      backgroundColor: undefined,
      setBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
    }),
    {
      name: import.meta.env.VITE_APPLICATION,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
