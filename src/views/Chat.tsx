import { FormEvent, useEffect, useRef, useState } from "react";
import { AssistantAvatar } from "../components/AssistantAvatar";
import { Input } from "../components/Input";
import { SmallButton } from "../components/SmallButton";
import { UserAvatar } from "../components/UserAvatar";
import { WizardPageProps } from "./Main";
import { FinalModal } from "../components/FinalModal";
import useChat from "../hooks/useChat";
import { Spinner } from "@sk-web-gui/react";

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
        className="flex flex-col gap-12 h-full justify-between touch-none overflow-hidden "
        style={{ maxHeight: winHeight }}
      >
        <div className="grow overflow-y-auto pb-[4rem]" ref={chatRef}>
          <ul className="px-[14rem] pt-[8rem] flex flex-col gap-[3rem]">
            <li className="flex gap-20 items-start justify-start">
              <div className="w-[4.2rem] text-right block text-light-secondary">
                <AssistantAvatar />
              </div>
              <div className="w-full text-left">
                Vad skulle göra Sundsvall bättre?
              </div>
            </li>
            {history.map((msg, index) => (
              <li
                key={`msg-${index}`}
                className="flex gap-20 items-start justify-start"
              >
                <div className="w-[4.2rem] text-right block">
                  {msg.origin === "assistant" ? (
                    <AssistantAvatar />
                  ) : (
                    <UserAvatar />
                  )}
                </div>
                <div className="w-full text-left">
                  {index !== 0 && msg.origin === "assistant" && (
                    <strong className="block">Sundsvalls AI</strong>
                  )}
                  {msg.text}
                </div>
              </li>
            ))}
            {loading && (
              <li className="flex gap-20 items-start justify-start">
                <div className="w-[4.2rem] text-right block text-light-secondary">
                  <AssistantAvatar />
                </div>
                <div className="w-full text-left">
                  <span className="flex gap-8 items-center">
                    <strong>Sundsvalls AI</strong>
                    <Spinner color="white" size={2} />
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
        <footer className="grow-0 shrink-0  pb-[4.4rem] px-[17rem] flex flex-col gap-32 items-center w-full">
          <SmallButton onClick={() => setShowModal(true)}>
            Avsluta chatten
          </SmallButton>
          <form onSubmit={submit}>
            <Input
              buttonDisabled={!done}
              placeholder="Fortsätt chatta"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[49.4rem]"
            />
          </form>
        </footer>
      </div>

      <FinalModal open={showModal} onClose={onNextPage} />
    </div>
  );
};
