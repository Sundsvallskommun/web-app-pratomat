import { useEffect, useState } from "react";
import { BigButton } from "../components/BigButton";
import { Waves } from "../components/Waves";
import { useAppStore } from "../hooks/appStore";
import { WizardPageProps } from "./Main";

export const Start: React.FC<WizardPageProps> = ({ onNextPage }) => {
  const [winWidth, setWinWidth] = useState<number>(window.innerWidth);
  const [question, startText] = useAppStore((state) => [
    state.question,
    state.startText,
  ]);
  useEffect(() => {
    const updateWidth = () => {
      setWinWidth(window.innerWidth);
    };
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === " " && event.ctrlKey) {
        onNextPage && onNextPage();
      }
    };

    document.addEventListener("keypress", handleKeyboard);
    window.addEventListener("resize", updateWidth);
    return () => {
      document.removeEventListener("keypress", handleKeyboard);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div className="relative w-full h-full landscape:overflow-auto">
      <div className="relative flex flex-col gap-[6rem] px-32 md:px-[10rem] pt-[14%] landscape:pt-[8%] pb-64 text-center items-center justify-start z-10">
        <h1 className="text-h3 sm:text-h1 md:text-display-2 text-light-secondary font-header font-extrabold">
          {question}
        </h1>
        <BigButton onClick={() => onNextPage && onNextPage()}>
          {startText}
        </BigButton>
      </div>
      <div
        className="fixed bottom-0 w-[200%] -ml-[50%] max-h-[31%] overflow-hidden flex justify-center"
        style={{ height: winWidth * 0.45 }}
      >
        <Waves size={winWidth < 830 ? winWidth * 0.11 : undefined} />
      </div>
    </div>
  );
};
