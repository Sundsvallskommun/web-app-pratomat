import { Icon, useGui, Tooltip } from "@sk-web-gui/react";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { BigButton } from "../components/BigButton";
import { SmallButton } from "../components/SmallButton";
import { TextArea } from "../components/TextArea";
import { Waves } from "../components/Waves";
import useChat from "../hooks/useChat";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { WizardPageProps } from "./Main";
import { useTranslation } from "react-i18next";

export const StartTalking: React.FC<WizardPageProps> = ({
  onNextPage,
  onPrevPage,
}) => {
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useGui();
  const isMobile = useMediaQuery(`screen and (max-width:${theme.screens.md})`);
  const [useKeyboard, setUseKeyboard] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { sendQuery, done, history } = useChat();
  const [dicateHover, setDictateHover] = useState<boolean>(false);
  const [dicateFocus, setDictateFocus] = useState<boolean>(false);
  const [backHover, setBackHover] = useState<boolean>(false);
  const [backFocus, setBackFocus] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLDivElement>(null);
  const { listening, transcript, start, stop, toggleListening, reset, error } =
    useSpeechToText();
  const { t } = useTranslation(["start_talking", "common"]);

  const setInputFocus = () => {
    stop();
    setUseKeyboard(true);
    inputRef.current && inputRef.current.focus();
  };

  const resetText = () => {
    reset();
    setText("");
    if (!useKeyboard && !listening) {
      start();
    }
  };

  const handleClickOnText = (event: MouseEvent<HTMLElement>) => {
    if (useKeyboard) {
      setInputFocus();
    } else {
      event.preventDefault();
      event.stopPropagation();
      start();
    }
  };

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
    setText(transcript);
  }, [transcript]);

  useEffect(() => {
    start();
    return () => {
      stop();
      reset();
    };
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendToAi();
  };

  const sendToAi = () => {
    if (text) {
      setLoading(true);
      sendQuery(text);
    }
  };

  useEffect(() => {
    if (!useKeyboard) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [text, useKeyboard]);

  useEffect(() => {
    if (history.length > 1 && loading) {
      onNextPage && onNextPage();
    }
  }, [history, loading, onNextPage]);

  useEffect(() => {
    if (!useKeyboard && !listening) {
      sendToAi();
    }
    //eslint-disable-next-line
  }, [listening, useKeyboard]);

  return (
    <div className="relative w-full h-full portrait:max-h-dvh portrait:overflow-hidden landscape:overflow-auto">
      <div className="absolute top-16 left-16 md:top-[3rem] md:left-[3rem]">
        <button
          type="button"
          className="bg-transparent border-1 border-light-primary flex justify-center items-center w-32 h-32 sm:w-40 sm:h-40 md:w-[5.2rem] md:h-[5.2rem] rounded-full focus-visible:ring ring-ring ring-offset-bjornstigen-surface-primary hover:bg-bjornstigen-surface-primary-hover"
          aria-label={t("start_talking:back_to_start")}
          onClick={() => onPrevPage && onPrevPage()}
          onFocus={() => setBackFocus(true)}
          onBlur={() => setBackFocus(false)}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
        >
          <Icon name="arrow-left" className="text-light-secondary" />
        </button>

        <Tooltip
          position="right"
          className="absolute top-0 left-full transition-opacity z-10"
          style={{
            opacity: backFocus || backHover ? 1 : 0,
          }}
        >
          {t("start_talking:back_to_start")}
        </Tooltip>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full w-full pb-32 md:pb-[10rem]"
      >
        <div className="flex flex-col items-center justify-start px-32 md:px-[10rem] pt-[6rem] text-center grow-0 portrait:shrink landscape:shrink-0 overflow-hidden">
          <h1 className="sr-only">{t("common:pratomaten")}</h1>
          <label
            className="mb-16 sm:mb-32 md:mb-[10rem] text-light-secondary text-large sm:text-h1 font-display font-extrabold grow-0 portrait:shrink landscape:shrink-0"
            id="mainlabel"
          >
            {import.meta.env.VITE_QUESTION}
          </label>
          <div className="flex justify-center items-center md:h-[6.9rem] h-[4.2rem] portrait:shrink landscape:shrink-0 grow-0 mb-16 sm:mb-24 md:mb-64">
            {loading ? (
              <span className="relative ">
                <Icon name="more-horizontal" size={isMobile ? 60 : 100}></Icon>
                <Icon
                  name="more-horizontal"
                  size={isMobile ? 60 : 100}
                  className="absolute animate-ping left-0 top-0"
                ></Icon>
              </span>
            ) : (
              <span className="relative text-center">
                <Waves
                  as="button"
                  type="button"
                  tabIndex={0}
                  aria-label={t("common.listen")}
                  aria-pressed={listening}
                  className="focus-visible:ring ring-ring ring-offset-bjornstigen-surface-primary rounded-button-lg"
                  onClick={() => continueTalking()}
                  size={isMobile ? 6 : 10}
                  animate={!!listening}
                  onFocus={() => setDictateFocus(true)}
                  onBlur={() => setDictateFocus(false)}
                  onMouseEnter={() => setDictateHover(true)}
                  onMouseLeave={() => setDictateHover(false)}
                />
                {(dicateFocus || dicateHover) && (
                  <Tooltip
                    position="below"
                    className="absolute top-full left-0 w-full capitalize z-10"
                  >
                    {listening ? t("common:listening") : t("common.listen")}
                  </Tooltip>
                )}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-start px-32 md:px-[10rem] text-center grow portrait:shrink landscape:shrink-0 pb-32 overflow-hidden">
          <div className="w-full max-h-[32rem] overflow-hidden flex items-center justify-center shrink grow pt-16">
            <div
              className="relative w-full max-h-[32rem] min-h-[6rem] max-w-[50rem] overflow-y-auto overflow-x-hidden text-center h-full"
              ref={textAreaRef}
            >
              <TextArea
                ref={inputRef}
                value={text}
                listening={listening}
                onClick={handleClickOnText}
                errorMessage={!useKeyboard && error ? error.message : undefined}
                onChange={(e) => setText(e.target.value)}
                aria-labelledby="mainlabel"
                tabIndex={useKeyboard ? 0 : -1}
                placeholder={
                  !useKeyboard && !listening
                    ? t("start_talking:click_to", {
                        action: useKeyboard
                          ? t("common:write")
                          : t("common:talk"),
                      })
                    : t("start_talking:waiting_for", {
                        action: useKeyboard
                          ? t("common:write")
                          : t("common:talk"),
                      })
                }
              />
            </div>
          </div>
          <div className="sr-only" aria-live="polite">
            {loading &&
              `${t("common:sent")}. ${t("common:waiting_for_answer")}`}
          </div>
        </div>
        <footer className="grow-0 shrink-0 flex flex-col items-center justify-start text-center pb-0 md:pb-32 w-full gap-16 sm:gap-32 md:gap-40">
          <div className="flex max-md:flex-row max-md:flex-wrap flex-col gap-16 items-center max-md:justify-center">
            <SmallButton disabled={loading} onClick={() => resetText()}>
              {t("start_talking:restart")}
            </SmallButton>
            <SmallButton disabled={loading} onClick={() => setInputFocus()}>
              {t("start_talking:use_keyboard")}
            </SmallButton>
          </div>
          <BigButton type="submit" disabled={!done || !text || loading}>
            {t("start_talking:submit")}
          </BigButton>
        </footer>
      </form>
    </div>
  );
};
