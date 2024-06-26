import { ReactNode, createContext, useContext, useState } from "react";
import { ChatHistory } from "../interfaces/history";

export interface IAssistantContext {
  history?: ChatHistory;
  setHistory: React.Dispatch<React.SetStateAction<ChatHistory>>;
  clearHistory: () => void;
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AssistantContext = createContext<IAssistantContext>(null);

export const useAssistant = () => useContext(AssistantContext);

export const AssistantWrapper: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [done, setDone] = useState<boolean>(true);

  const clearHistory = () => {
    setHistory([]);
  };

  const context = {
    history,
    setHistory,
    clearHistory,
    done,
    setDone,
  };

  return (
    <AssistantContext.Provider value={context}>
      {children}
    </AssistantContext.Provider>
  );
};
