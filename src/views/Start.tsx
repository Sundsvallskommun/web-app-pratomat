import { BigButton } from "../components/BigButton";
import { Link } from "@sk-web-gui/react";
import { Waves } from "../components/Waves";
import { WizardPageProps } from "./Main";

export const Start: React.FC<WizardPageProps> = ({ onNextPage }) => {
  return (
    <div className="relative w-full h-full">
      <div className="flex flex-col gap-[6rem] px-[10rem] pt-[16.4rem] text-center items-center justify-start text-[2rem]">
        <h1 className="text-display-2 text-light-secondary font-header font-extrabold">
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
      <div className="absolute bottom-0 w-[200%] -ml-[50%] h-[36.7rem] overflow-hidden flex justify-center">
        <Waves />
      </div>
    </div>
  );
};
