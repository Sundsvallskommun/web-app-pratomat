import { useChat } from "@sk-web-gui/ai";
import { cx, Spinner } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { useAppStore } from "../hooks/appStore";
import { Chat } from "./Chat";
import { Start } from "./Start";
import { StartTalking } from "./StartTalking";
import { usePratomat } from "../services/pratomat-service";
import { bgSurfacePrimaryMap } from "../utils/backgroundClassMap";
export interface WizardPageProps {
  onNextPage?: (data?: Record<string, string>) => void;
  onPrevPage?: (data?: Record<string, string>) => void;
}

interface MainProps {
  appId: string;
}

export const Main: React.FC<MainProps> = ({ appId }) => {
  const [page, setPage] = useState<number>(0);
  const [sessionId, setSessionId] = useAppStore((state) => [
    state.sessionId,
    state.setSessionId,
  ]);

  const { loaded } = usePratomat(appId);
  const { sendQuery, history, done, newSession, session } = useChat({
    sessionId,
  });
  const backgroundColor = useAppStore((state) => state.backgroundColor);

  const bgClass = bgSurfacePrimaryMap[backgroundColor];

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

  if (!loaded) return <Spinner />;

  return (
    <main
      className={cx(
        "w-dvw h-dvh portrait:max-h-dvh text-light-primary",
        bgClass
      )}
    >
      {pages[page]}
    </main>
  );
};
