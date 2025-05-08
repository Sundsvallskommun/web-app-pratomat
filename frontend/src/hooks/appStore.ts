import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { FinalQuestion } from "../data-contracts/backend/data-contracts";
import { Color } from "../interfaces/assistant.interface";

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
  backgroundColor: Color;
  setBackgroundColor: (color: Color) => void;
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
      backgroundColor: "bjornstigen",
      setBackgroundColor: (color) => set(() => ({ backgroundColor: color })),
    }),
    {
      name: import.meta.env.VITE_APPLICATION,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
