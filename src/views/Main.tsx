import { useEffect, useState } from "react";
import { Start } from "./Start";
import { StartTalking } from "./StartTalking";
import { Chat } from "./Chat";
import { useChat } from "@sk-web-gui/ai";

export interface WizardPageProps {
  onNextPage?: (data?: Record<string, string>) => void;
  onPrevPage?: (data?: Record<string, string>) => void;
}

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const { newSession, session } = useChat();

  useEffect(() => {
    if (page === 0) {
      newSession();
    }
    //eslint-disable-next-line
  }, [page]);

  const pages = [
    <Start onNextPage={() => setPage(1)} />,
    <StartTalking
      sessionId={session?.id}
      onPrevPage={() => setPage(0)}
      onNextPage={() => setPage(2)}
    />,
    <Chat sessionId={session?.id} />,
  ];

  return (
    <main className="w-dvw h-dvh portrait:max-h-dvh bg-bjornstigen-surface-primary text-light-primary">
      {pages[page]}
    </main>
  );
};
