import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface AppStore {
  sessionId: string;
  setSessionId: (id: string) => void;
}

export const useAppStore = createWithEqualityFn(
  persist<AppStore>(
    (set) => ({
      sessionId: "",
      setSessionId: (sessionId) => set(() => ({ sessionId })),
    }),
    {
      name: import.meta.env.VITE_APPLICATION,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
