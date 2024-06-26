import { Button, Modal, Spinner } from "@sk-web-gui/react";
import { FormEvent, useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import { RadioButton } from "./RadioButton";
import { useTranslation } from "react-i18next";

interface FinalModalProps {
  open: boolean;
}

const genders = ["woman", "man", "none", "noanswer"];

const ages = ["below 20", "20-30", "30-45", "45-70", "above 70"];

export const FinalModal: React.FC<FinalModalProps> = ({ open }) => {
  const [pickedGender, setPickedGender] = useState<string>("");
  const [pickedAge, setPickedAge] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const { t } = useTranslation(["common", "final"]);
  const [recieved, setRecieved] = useState<boolean>(false);
  const { sendQuery, clearHistory, history } = useChat();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //TODO: Handle submit
    const message =
      pickedGender === "noanswer"
        ? t("final:message.noanswer", { age: t(`final:age.${pickedAge}`) })
        : t("final:message.other", {
            gender: t(`final:gender.${pickedGender}`, { context: "full" }),
            age: t(`final:age.${pickedAge}`),
          });
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
          <h1 className="text-[3.2rem] mb-[2.5rem]">{t("final:thank_you")}</h1>
          <p className="mb-[5.6rem] text-[1.6rem]">{t("final:description")}</p>
          <fieldset className="flex flex-col mb-[4rem]">
            <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
              {t("final:i_identify_as")}
            </legend>
            <div
              role="group"
              className="flex gap-12 justify-center flex-wrap md:flex-nowrap"
            >
              {genders.map((gender, index) => (
                <RadioButton
                  key={`${index}-${gender}`}
                  value={gender}
                  name="gender"
                  checked={pickedGender === gender}
                  onChange={(e) => setPickedGender(e.target.value)}
                  className="capitalize"
                >
                  {t(`final:gender.${gender}`)}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-[2.5rem] mb-[3.4rem]">
            <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
              {t("final:my_age_is")}
            </legend>
            <div
              role="group"
              className="flex gap-12 justify-center flex-wrap md:flex-nowrap"
            >
              {ages.map((age, index) => (
                <RadioButton
                  key={`${index}-${age}`}
                  value={age}
                  name="age"
                  className="capitalize"
                  checked={age === pickedAge}
                  onChange={(e) => setPickedAge(e.target.value)}
                >
                  {t(`final:age.${age}`)}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <div className="flex gap-12">
            <Button
              disabled={!pickedAge || !pickedGender || sent}
              rounded
              type="submit"
              className="capitalize"
            >
              {!sent ? t("common:done") : <Spinner size={2.4} />}
            </Button>
            <Button
              variant="tertiary"
              showBackground={false}
              onClick={() => window.location.reload()}
              className="font-normal font-header"
            >
              {t("common:skip")}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
