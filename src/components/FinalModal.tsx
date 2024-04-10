import { Button, Modal, Spinner } from "@sk-web-gui/react";
import { FormEvent, useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import { RadioButton } from "./RadioButton";

interface FinalModalProps {
  open: boolean;
}

const genders = {
  woman: "Kvinna",
  man: "Man",
  none: "Ickebinär",
  noanswer: "Vill ej svara",
};

const ages = {
  "0": "Under 20",
  "1": "20-30",
  "2": "30-45",
  "3": "45-70",
  "4": "70+",
};

export const FinalModal: React.FC<FinalModalProps> = ({ open }) => {
  const [pickedGender, setPickedGender] = useState<string>("");
  const [pickedAge, setPickedAge] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [recieved, setRecieved] = useState<boolean>(false);
  const { sendQuery, clearHistory, history } = useChat();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //TODO: Handle submit
    const message =
      pickedGender === "noanswer"
        ? `Jag tillhör åldersgruppen ${ages[pickedAge]} år`
        : `Jag är en ${
            pickedGender === "none" ? "Ickebinär person" : genders[pickedGender]
          } som tillhör åldersgruppen ${ages[pickedAge]} år`;
    sendQuery(message);
    setSent(true);
  };

  useEffect(() => {
    if (sent && history.at(-1).origin === "assistant" && history.at(-1).text) {
      setRecieved(true);
    }
  }, [sent, history]);

  useEffect(() => {
    if (recieved) {
      clearHistory();
      window.location.reload();
    }
  }, [clearHistory, recieved]);

  return (
    <Modal
      hideClosebutton
      className="bg-[#FEDFE2] w-full md:w-[61.5rem] my-16 h-full md:h-[62.8rem] pt-[7.3rem] pb-[2.6rem] px-[3.6rem] text-center"
      show={open}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <h1 className="text-[3.2rem] mb-[2.5rem]">
            Tack så mycket för dina svar!
          </h1>
          <p className="mb-[5.6rem] text-[1.6rem]">
            För att bättre förstå dina svar vill vi gärna veta lite mer om dig.
            Ingen persondata kommer att lagras.
          </p>
          <fieldset className="flex flex-col mb-[4rem]">
            <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
              Jag identifierar mig som
            </legend>
            <div
              role="group"
              className="flex gap-12 justify-center flex-wrap md:flex-nowrap"
            >
              {Object.keys(genders).map((gender, index) => (
                <RadioButton
                  key={`${index}-${gender}`}
                  value={gender}
                  name="gender"
                  checked={pickedGender === gender}
                  onChange={(e) => setPickedGender(e.target.value)}
                >
                  {genders[gender]}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-[2.5rem] mb-[3.4rem]">
            <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
              Jag är i åldersgruppen
            </legend>
            <div
              role="group"
              className="flex gap-12 justify-center flex-wrap md:flex-nowrap"
            >
              {Object.keys(ages).map((age, index) => (
                <RadioButton
                  key={`${index}-${age}`}
                  value={age}
                  name="age"
                  checked={age === pickedAge}
                  onChange={(e) => setPickedAge(e.target.value)}
                >
                  {ages[age]}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <div className="flex gap-12">
            <Button
              disabled={!pickedAge || !pickedGender || sent}
              rounded
              type="submit"
            >
              {!sent ? "Klar" : <Spinner size={2.4} />}
            </Button>
            <Button
              variant="tertiary"
              showBackground={false}
              onClick={() => window.location.reload()}
              className="font-normal font-header"
            >
              Hoppa över
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
