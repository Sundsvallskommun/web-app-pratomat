import { Spinner } from "@sk-web-gui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AssistantAvatar } from "../components/AssistantAvatar";
import { FinalModal } from "../components/FinalModal";
import { ChatInput } from "../components/ChatInput";
import { SmallButton } from "../components/SmallButton";
import { UserAvatar } from "../components/UserAvatar";
import useChat from "../hooks/useChat";
import { WizardPageProps } from "./Main";

interface ChatProps extends WizardPageProps {}

export const Chat: React.FC<ChatProps> = ({ onNextPage }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [winHeight, setWinHeight] = useState<number>(window.innerHeight);
  const chatRef = useRef<HTMLDivElement>(null);
  const { history, sendQuery, done } = useChat();

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
      window.scrollTo(0, window.innerHeight);
    };

    //Set the height to get everything in view when keyboard is visible
    const updateWinHeight = () => {
      setWinHeight(window.innerHeight);
    };

    window.addEventListener("scroll", updateWinHeight);

    return () => {
      window.removeEventListener("scroll", updateWinHeight);
      window.onscroll = function () {};
    };
  }, []);

  return (
    <div className="relative w-full h-full max-h-dvh flex flex-col justify-end items-center touch-none">
      <div
        className="flex flex-col h-full justify-between items-center touch-none overflow-hidden max-w-full w-full gap-1 "
        style={{ maxHeight: winHeight }}
      >
        <div
          className="grow overflow-y-auto max-w-full w-full flex justify-center"
          ref={chatRef}
        >
          <ul className="w-full max-w-[84rem] px-32 md:px-[14rem] pt-32 sm:pt-40 md:pt-[8rem] flex flex-col gap-[3rem] pb-16">
            <li className="flex gap-12 md:gap-20 items-start justify-start">
              <div className="w-[4.2rem] text-right block text-light-secondary grow-0 shrink-0">
                <AssistantAvatar />
              </div>
              <div className="w-full text-left grow">
                Vad skulle göra Sundsvall bättre?
              </div>
            </li>
            {history.map((msg, index) => (
              <li
                key={`msg-${index}`}
                className="flex gap-12 md:gap-20 items-start justify-start"
              >
                <div className="w-[4.2rem] text-right block grow-0 shrink-0">
                  {msg.origin === "assistant" ? (
                    <AssistantAvatar />
                  ) : (
                    <UserAvatar />
                  )}
                </div>
                <div className="text-left grow w-full overflow-x-hidden">
                  {index !== 0 && msg.origin === "assistant" && (
                    <strong className="block">Sundsvalls AI</strong>
                  )}
                  <p className="hyphens-auto">{msg.text}</p>
                </div>
              </li>
            ))}
            {loading && (
              <li className="flex gap-12 md:gap-20 items-start justify-start">
                <div className="w-[4.2rem] text-right block text-light-secondary grow-0 shrink-0">
                  <AssistantAvatar />
                </div>
                <div className="grow w-full text-left">
                  <span className="flex gap-8 items-center">
                    <strong>Sundsvalls AI</strong>
                    <Spinner color="white" size={2} />
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
        <footer className="w-full max-w-[84rem] grow-0 shrink-0 pb-24 sm:pb-32 md:pb-[4.4rem] px-32 md:px-[17rem] flex flex-col gap-18 sm:gap-24 md:gap-32 pt-8 sm:pt-16 md:pt-[4rem] items-center  shadow-upper shadow-bjornstigen-surface-primary">
          <SmallButton onClick={() => setShowModal(true)}>
            Avsluta chatten
          </SmallButton>
          <form onSubmit={submit} className="w-full max-w-[50rem]">
            <ChatInput
              buttonDisabled={!done || !query}
              loading={!done}
              placeholder="Fortsätt chatta"
              value={query}
              onChangeValue={setQuery}
              className="w-full md:w-[50rem]"
            />
          </form>
        </footer>
      </div>

      <FinalModal open={showModal} onClose={onNextPage} />
    </div>
  );
};
