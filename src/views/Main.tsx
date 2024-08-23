import { useChat } from "@sk-web-gui/ai";
import { useEffect, useState } from "react";
import { useAppStore } from "../hooks/appStore";
import { Chat } from "./Chat";
import { Start } from "./Start";
import { StartTalking } from "./StartTalking";

export interface WizardPageProps {
  onNextPage?: (data?: Record<string, string>) => void;
  onPrevPage?: (data?: Record<string, string>) => void;
}

export const Main: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [sessionId, setSessionId] = useAppStore((state) => [
    state.sessionId,
    state.setSessionId,
  ]);
  const { sendQuery, history, done, newSession, session } = useChat({
    sessionId,
  });

  useEffect(() => {
    if (page === 0) {
      newSession();
    }
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (typeof session?.id === "string" && session.id !== sessionId) {
      setSessionId(session.id);
    }
  }, [session, history]);

  const pages = [
    <Start onNextPage={() => setPage(1)} />,
    <StartTalking
      sendQuery={sendQuery}
      history={history}
      done={done}
      onPrevPage={() => setPage(0)}
      onNextPage={() => setPage(2)}
    />,
    <Chat
      sendQuery={sendQuery}
      history={history}
      sessionId={sessionId}
      onNextPage={() => setPage(0)}
    />,
  ];

  return (
    <main className="w-dvw h-dvh portrait:max-h-dvh bg-bjornstigen-surface-primary text-light-primary">
      {pages[page]}
    </main>
  );
};
