import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatFeed } from "../components/ChatFeed";
import { ChatInput } from "../components/ChatInput";
import { FinalModal } from "../components/FinalModal";
import { SmallButton } from "../components/SmallButton";
import useChat from "../hooks/useChat";
import { WizardPageProps } from "./Main";
import { useTranslation } from "react-i18next";

interface ChatProps extends WizardPageProps {}

export const Chat: React.FC<ChatProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [winHeight, setWinHeight] = useState<number>(window.innerHeight);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { history, sendQuery, done } = useChat();

  const { t } = useTranslation(["chat", "common"]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (query) {
      sendQuery(query);
      setQuery("");
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history, loading, winHeight]);

  useEffect(() => {
    if (!done) {
      if (history.at(-1).origin === "user") {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } else {
      if (history.at(-1).origin !== "user") {
        setLoading(false);
      }
    }
  }, [done, history]);

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

  return (
    <div className="relative w-full h-full max-h-full flex flex-col justify-end items-center touch-none">
      <div
        className="flex flex-col h-full justify-between items-center touch-none overflow-hidden max-w-full w-full gap-1"
        style={{ maxHeight: isWriting ? winHeight : "100%" }}
      >
        <div
          className="grow overflow-y-auto max-w-full w-full flex justify-center items-start"
          ref={chatRef}
        >
          <ChatFeed />
        </div>
        <footer className="w-full max-w-[84rem] grow-0 shrink-0 pb-24 sm:pb-32 md:pb-[4.4rem] px-32 md:px-[17rem] flex flex-col gap-18 sm:gap-24 md:gap-32 pt-8 sm:pt-16 md:pt-[4rem] items-center  shadow-upper shadow-bjornstigen-surface-primary">
          <SmallButton
            onClick={() => setShowModal(true)}
            aria-haspopup="dialog"
            aria-expanded={showModal}
          >
            {t("chat:exit_chat")}
          </SmallButton>
          <form onSubmit={submit} className="w-full max-w-[50rem]">
            <ChatInput
              buttonDisabled={!done || !query}
              loading={!done}
              placeholder={t("chat:continue_chat")}
              value={query}
              onFocus={() => setIsWriting(true)}
              onBlur={() => setIsWriting(false)}
              onChangeValue={setQuery}
              className="w-full md:w-[50rem]"
            />
          </form>
        </footer>
      </div>

      <FinalModal open={showModal} />
    </div>
  );
};
