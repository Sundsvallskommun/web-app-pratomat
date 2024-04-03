import { Icon, useGui } from "@sk-web-gui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { BigButton } from "../components/BigButton";
import { SmallButton } from "../components/SmallButton";
import { TextArea } from "../components/TextArea";
import { Waves } from "../components/Waves";
import useChat from "../hooks/useChat";
import { WizardPageProps } from "./Main";
import { useMediaQuery } from "usehooks-ts";
import { useSpeechToText } from "../hooks/useSpeechToText";

export const StartTalking: React.FC<WizardPageProps> = ({
  onNextPage,
  onPrevPage,
}) => {
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useGui();
  const isMobile = useMediaQuery(`screen and (max-width:${theme.screens.md})`);
  const [useKeyboard, setUseKeyboard] = useState<boolean>(false);
  const { sendQuery, done } = useChat();
  const { listening, transcript, start, stop, reset, error } =
    useSpeechToText();

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

  const continueTalking = () => {
    setUseKeyboard(false);
    setTimeout(() => {
      start();
    }, 50);
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
    if (text) {
      sendQuery(text);
      onNextPage && onNextPage();
    }
  };

  return (
    <div className="relative w-full h-full max-h-full">
      <button
        type="button"
        title="Gå tillbaks till start"
        className="absolute top-[3rem] left-[3rem] bg-transparent border-1 border-light-primary flex justify-center items-center w-40 h-40 md:w-[5.2rem] md:h-[5.2rem] rounded-full"
        onClick={() => onPrevPage && onPrevPage()}
      >
        <Icon name="arrow-left" className="text-light-secondary" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full w-full max-h-full pb-32 md:pb-[10rem]"
      >
        <div className="flex flex-col items-center justify-start px-32 md:px-[10rem] pt-[6rem] sm:pt-[6rem] text-center grow shrink pb-32 overflow-hidden max-h-full">
          <h1
            className="mb-16 sm:mb-32 md:mb-[10rem] text-light-secondary text-large sm:text-h1 font-display font-extrabold"
            id="mainlabel"
          >
            Vad skulle göra
            <br />
            Sundsvall bättre?
          </h1>
          <Waves
            role="button"
            onClick={() => continueTalking()}
            size={isMobile ? 6 : 10}
            animate={!!listening}
            className="mb-16 sm:mb-24 md:mb-64 shrink-0"
          />

          <div className="w-full h-full max-h-[32rem] overflow-hidden flex items-center justify-center shrink-0 grow">
            <div className="relative w-full min-h-[6rem] max-w-[50rem] max-h-full overflow-y-auto overflow-x-hidden text-center shrink-0">
              <TextArea
                ref={inputRef}
                value={text}
                onFocus={() => {
                  setUseKeyboard(true);
                  stop();
                }}
                errorMessage={!useKeyboard && error ? error.message : undefined}
                onChange={(e) => setText(e.target.value)}
                aria-labelledby="mainlabel"
              />
            </div>
          </div>
        </div>
        <footer className="grow-0 shrink-0 flex flex-col items-center justify-start text-center pb-0 md:pb-32 w-full gap-16 sm:gap-32 md:gap-40">
          <div className="flex max-md:flex-row max-md:flex-wrap flex-col gap-16 items-center">
            <SmallButton onClick={() => resetText()}>Börja om</SmallButton>
            <SmallButton onClick={() => setInputFocus()}>
              Använd tangentbord
            </SmallButton>
          </div>
          <BigButton type="submit" disabled={!done || !text}>
            Se vad vår AI säger
          </BigButton>
        </footer>
      </form>
    </div>
  );
};
