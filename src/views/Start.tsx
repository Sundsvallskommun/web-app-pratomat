import { Link } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { BigButton } from "../components/BigButton";
import { Waves } from "../components/Waves";
import { WizardPageProps } from "./Main";

export const Start: React.FC<WizardPageProps> = ({ onNextPage }) => {
  const [winWidth, setWinWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateWidth = () => {
      setWinWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="relative flex flex-col gap-[6rem] px-32 md:px-[10rem] pt-[8rem] sm:pt-[12rem] md:pt-[16.4rem] text-center items-center justify-start z-10">
        <h1 className="text-h3 sm:text-h1 md:text-display-2 text-light-secondary font-header font-extrabold">
          Vad skulle göra Sundsvall bättre?
        </h1>
        <BigButton onClick={() => onNextPage && onNextPage()}>
          Säg vad du tycker
        </BigButton>
        <p className="text-light-secondary opacity-75 max-w-[30rem]">
          Vi sparar ingen persondata. <br />
          Läs vår{" "}
          <Link className="text-light-secondary hover:text-light-secondary">
            integritetspolicy.
          </Link>
        </p>
      </div>
      <div
        className="absolute bottom-0 w-[200%] -ml-[50%] max-h-[31%] overflow-hidden flex justify-center"
        style={{ height: winWidth * 0.45 }}
      >
        <Waves size={winWidth < 830 ? winWidth * 0.11 : undefined} />
      </div>
    </div>
  );
};
