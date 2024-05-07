import { Spinner } from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@sk-web-gui/ai";
import { AssistantAvatar } from "./AssistantAvatar";
import { MarkdownRendered } from "./MarkdownRendered";
import { UserAvatar } from "./UserAvatar";
import { useTranslation } from "react-i18next";

export const ChatFeed: React.FC = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { history, done } = useChat();
  const timeout = useRef(setTimeout(() => {}));
  const { t } = useTranslation(["chat", "common"]);

  useEffect(() => {
    if (!done) {
      timeout.current = setTimeout(() => {
        setShowLoading(true);
      }, 7000);
    } else {
      clearTimeout(timeout.current);
      setShowLoading(false);
    }
  }, [done]);

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

  return (
    <ul
      className="w-full max-w-[84rem] px-32 md:px-[14rem] pt-32 sm:pt-40 md:pt-[8rem] flex flex-col gap-[3rem] pb-16"
      aria-live="polite"
      aria-atomic={false}
    >
      <li className="flex gap-12 md:gap-20 items-start justify-start">
        <div
          className="w-[4.2rem] text-right block text-light-secondary grow-0 shrink-0"
          aria-hidden={true}
        >
          <AssistantAvatar />
        </div>
        <div className="w-full text-left grow">
          {import.meta.env.VITE_QUESTION}
        </div>
      </li>

      {history.map((msg, index) => (
        <li
          key={`msg-${index}`}
          className="flex gap-12 md:gap-20 items-start justify-start"
        >
          <div
            className="w-[4.2rem] text-right block grow-0 shrink-0"
            aria-hidden={true}
          >
            {msg.origin === "user" ? <UserAvatar /> : <AssistantAvatar />}
          </div>
          {index === history.length - 1 &&
          msg.origin === "assistant" &&
          showLoading ? (
            <div className="sr-only" aria-live="polite">
              {t("common:waiting_for_answer")}
            </div>
          ) : undefined}
          <div
            className="text-left grow w-full overflow-x-hidden"
            aria-hidden={
              index === history.length - 1 && msg.origin === "assistant"
                ? !done
                : false
            }
          >
            {msg.origin === "assistant" && (
              <strong className="block" aria-hidden="true">
                {t("common:sundsvalls_ai")}
              </strong>
            )}
            <span className="sr-only">
              {msg.origin === "assistant"
                ? `${t("common:sundsvalls_ai")}: `
                : msg.origin === "system"
                ? `${t("common:error")}: `
                : `${t("common:you")}: `}
            </span>
            <MarkdownRendered text={msg.text} />
          </div>
        </li>
      ))}
      {loading && (
        <li className="flex gap-12 md:gap-20 items-start justify-start">
          <div
            className="w-[4.2rem] text-right block text-light-secondary grow-0 shrink-0"
            aria-hidden={true}
          >
            <AssistantAvatar />
          </div>
          <div className="grow w-full text-left" aria-hidden={true}>
            <span className="flex gap-8 items-center">
              <strong> {t("common:sundsvalls_ai")}</strong>
              <Spinner color="white" size={2} />
            </span>
          </div>
        </li>
      )}
    </ul>
  );
};
