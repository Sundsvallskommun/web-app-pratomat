import { Icon } from "@sk-web-gui/react";
import { FormEvent, useRef, useState } from "react";
import { BigButton } from "../components/BigButton";
import { SmallButton } from "../components/SmallButton";
import { TextArea } from "../components/TextArea";
import { Waves } from "../components/Waves";
import useChat from "../hooks/useChat";
import { WizardPageProps } from "./Main";

export const StartTalking: React.FC<WizardPageProps> = ({
  onNextPage,
  onPrevPage,
}) => {
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendQuery, done } = useChat();

  const setInputFocus = () => {
    inputRef.current && inputRef.current.focus();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (text) {
      sendQuery(text);
      onNextPage && onNextPage();
    }
  };

  return (
    <div className="relative w-dvw h-dvh pb-[10rem] overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full w-full max-h-full"
      >
        <button
          type="button"
          title="Gå tillbaks till start"
          className="absolute top-[3rem] left-[3rem] bg-transparent border-1 border-light-primary flex justify-center items-center w-[5.2rem] h-[5.2rem] rounded-full"
          onClick={() => onPrevPage && onPrevPage()}
        >
          <Icon name="arrow-left" className="text-light-secondary" />
        </button>
        <div className="flex flex-col items-center justify-start px-[10rem] pt-[6rem] text-center grow shrink pb-32 overflow-hidden max-h-full">
          <h1
            className="mb-[10rem] text-light-secondary text-[4rem] leading-[4rem] font-display font-extrabold"
            id="mainlabel"
          >
            Vad skulle göra
            <br />
            Sundsvall bättre?
          </h1>
          <Waves size={10} className="mb-64 shrink-0" />
          {/* NOTE: ADD COMPONENT FOR SPEACH TO TEXT HERE: */}
          <div className="w-full h-full shrink max-h-[32rem] overflow-hidden flex items-center justify-center">
            <div className="relative w-full min-h-[6rem] max-w-[50rem] max-h-full overflow-y-auto overflow-x-hidden text-center">
              <TextArea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-labelledby="mainlabel"
              />
            </div>
          </div>
        </div>
        <footer className="grow-0 shrink-0 flex flex-col items-center justify-start text-center pb-32 w-full gap-40">
          <div className="flex flex-col gap-16 items-center">
            <SmallButton onClick={() => setText("")}>Börja om</SmallButton>
            <SmallButton onClick={() => setInputFocus()}>
              Använd tangentbord
            </SmallButton>
          </div>
          <BigButton
            className="w-[11.8rem] h-[53.5rem]"
            type="submit"
            disabled={!done || !text}
          >
            Se vad vår AI säger
          </BigButton>
        </footer>
      </form>
    </div>
  );
};
