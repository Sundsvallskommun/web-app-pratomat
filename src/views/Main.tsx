import { useEffect, useState } from "react";
import { Start } from "./Start";
import { StartTalking } from "./StartTalking";
import { Chat } from "./Chat";
import { useAssistantContext } from "@sk-web-gui/ai";

export interface WizardPageProps {
  onNextPage?: (data?: Record<string, string>) => void;
  onPrevPage?: (data?: Record<string, string>) => void;
}

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const { clearHistory, setSessionId } = useAssistantContext();

  useEffect(() => {
    if (page === 0) {
      clearHistory();
      setSessionId(null);
    }
    //eslint-disable-next-line
  }, [page]);

  const pages = [
    <Start onNextPage={() => setPage(1)} />,
    <StartTalking
      onPrevPage={() => setPage(0)}
      onNextPage={() => setPage(2)}
    />,
    <Chat />,
  ];

  return (
    <main className="w-dvw h-dvh portrait:max-h-dvh bg-bjornstigen-surface-primary text-light-primary">
      {pages[page]}
    </main>
  );
};
