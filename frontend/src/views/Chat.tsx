import { AIFeed, ChatHistory, useSpeechToText } from "@sk-web-gui/ai";
import { Button } from "@sk-web-gui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssistantAvatar } from "../components/AssistantAvatar";
import { FinalModal } from "../components/FinalModal";
import { TextArea } from "../components/TextArea";
import { UserAvatar } from "../components/UserAvatar";
import { Waves } from "../components/Waves";
import { WizardPageProps } from "./Main";
import { useAppStore } from "../hooks/appStore";

interface ChatProps extends WizardPageProps {
  sessionId: string;
  history: ChatHistory;
  sendQuery: (query: string) => void;
}

export const Chat: React.FC<ChatProps> = ({
  sessionId,
  history,
  sendQuery,
  onNextPage,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [useKeyboard, setUseKeyboard] = useState<boolean>(false);
  const [winHeight, setWinHeight] = useState<number>(window.innerHeight);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const delayedSubmit = useRef(setTimeout(() => {}, 0));

  const inputRef = useRef<HTMLInputElement>(null);
  const [question] = useAppStore((state) => [state.question]);

  const { listening, stop, toggleListening, start, transcript, reset } =
    useSpeechToText();

  const scrollRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation(["chat", "common"]);

  const setInputFocus = () => {
    stop();
    setUseKeyboard(true);
    setIsWriting(true);
    inputRef.current && inputRef.current.focus();
  };

  const handleClickOnText = () => {
    if (useKeyboard) {
      setInputFocus();
    } else {
      if (!listening) {
        start();
      }
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (query) {
      sendQuery(query);
      setQuery("");
    }
  };

  useEffect(() => {
    if (listening) {
      setQuery(transcript);
    }
  }, [transcript, listening]);

  const continueTalking = () => {
    if (!useKeyboard) {
      toggleListening();
    } else {
      setUseKeyboard(false);
      setTimeout(() => {
        start();
      }, 50);
    }
  };

  useEffect(() => {
    //Prevent scrolling when keyboard is visible
    window.onscroll = function () {
      window.scrollTo(0, winHeight);
    };

    //Set the height to get everything in view when keyboard is visible
    const updateWinHeight = () => {
      setTimeout(() => {
        setWinHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener("scroll", updateWinHeight);

    return () => {
      window.removeEventListener("scroll", updateWinHeight);
      window.onscroll = function () {};
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, winHeight]);

  useEffect(() => {
    if (!useKeyboard && !listening && query) {
      delayedSubmit.current = setTimeout(() => {
        sendQuery(query);
        setQuery("");
        reset();
      }, 500);
    } else {
      clearTimeout(delayedSubmit.current);
    }

    //eslint-disable-next-line
  }, [listening, useKeyboard]);

  return (
    <div className="relative w-full h-full max-h-full flex flex-col justify-end items-center touch-none">
      <div
        className="flex flex-col h-full justify-between items-center touch-none overflow-hidden max-w-full w-full gap-1"
        style={{ maxHeight: isWriting ? winHeight : "100%" }}
      >
        <div className="max-w-content mt-48 mb-48">
          <h1 className="text-h1-sm md:text-h1-md xl:text-h1-lg text-purple-200 text-center">
            {question}
          </h1>
        </div>
        <div
          ref={scrollRef}
          className="grow flex text-base w-full max-w-full items-start justify-center overflow-y-auto px-16 sm:px-32 md:px-64"
        >
          <AIFeed
            className="max-w-[48em] w-full text-lead"
            history={history}
            sessionId={sessionId}
            showTitles={false}
            titles={{
              assistant: { title: "Sundsvalls AI", show: true },
              user: { title: "Du", show: false },
              system: { title: "Felmeddelande", show: false },
            }}
            showFeedback={false}
            inverted
            avatars={{
              user: <UserAvatar />,
              system: <AssistantAvatar />,
              assistant: <AssistantAvatar />,
            }}
          />
        </div>
        <form
          onSubmit={submit}
          className="relative max-w-[37rem] mx-auto flex flex-col items-center justify-start my-32 gap-16 text-center"
        >
          <Waves
            as="button"
            type="button"
            tabIndex={0}
            aria-label={t("common:listen")}
            aria-pressed={listening}
            className="focus-visible:ring ring-ring ring-offset-bjornstigen-surface-primary rounded-button-lg"
            size={6}
            animate={!!listening}
            onClick={() => continueTalking()}
          />

          <TextArea
            ref={inputRef}
            textSize="sm"
            onClick={() => handleClickOnText()}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder={
              !useKeyboard && !listening
                ? t("common:click_to", {
                    action: useKeyboard ? t("common:write") : t("common:talk"),
                  })
                : t("common:waiting_for", {
                    action: useKeyboard ? t("common:write") : t("common:talk"),
                  })
            }
          ></TextArea>
        </form>
        <footer className="w-full max-w-[84rem] grow-0 shrink-0 pb-24 sm:pb-32 md:pb-[4.4rem] px-32 md:px-[17rem] flex flex-col gap-18 sm:gap-24 md:gap-32 items-center">
          <Button
            color="bjornstigen"
            className="underline"
            size="md"
            onClick={() => setShowModal(true)}
            aria-haspopup="dialog"
            aria-expanded={showModal}
          >
            {t("chat:exit_chat")}
          </Button>

          <div className="flex max-md:flex-row max-md:flex-wrap flex-col md:mt-64 gap-16 items-center max-md:justify-center">
            <p className="text-h4-md text-light-primary mb-16">
              {useKeyboard
                ? t("common:want_to_talk")
                : t("common:want_to_write")}
            </p>
            {!useKeyboard ? (
              <Button
                size="lg"
                variant="secondary"
                type="button"
                rounded
                onClick={() => setInputFocus()}
                inverted
              >
                {t("common:use_keyboard")}
              </Button>
            ) : (
              <Button
                size="lg"
                type="button"
                variant="secondary"
                rounded
                onClick={() => continueTalking()}
                inverted
              >
                {t("common:use_microphone")}
              </Button>
            )}
          </div>
        </footer>
      </div>

      <FinalModal open={showModal} onClose={() => onNextPage()} />
    </div>
  );
};
