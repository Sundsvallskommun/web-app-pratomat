import { useChat } from "@sk-web-gui/ai";
import { Button, Modal } from "@sk-web-gui/react";
import { upperFirst } from "lodash";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadioButton } from "./RadioButton";
import { useAppStore } from "../hooks/appStore";

interface FinalModalProps {
  open: boolean;
  onClose: () => void;
}

const genders = ["woman", "man", "noanswer"];
const classes = ["F", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const FinalModal: React.FC<FinalModalProps> = ({ open, onClose }) => {
  const [pickedGender, setPickedGender] = useState<string>("");
  const [pickedClass, setPickedClass] = useState<string>("");
  const sessionId = useAppStore((state) => state.sessionId);
  const [sent, setSent] = useState<boolean>(false);
  const { t } = useTranslation(["common", "final"]);
  const { sendQuery, history } = useChat({ sessionId });

  const getClass = (classYear: string): string => {
    return classYear === "F" ? "förskoleklass" : `årskurs ${classYear}`;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const message =
      pickedGender === "noanswer"
        ? t("final:message.noanswer", { class: getClass(pickedClass) })
        : t("final:message.other", {
            gender: t(`final:gender.${pickedGender}`, { context: "full" }),
            class: getClass(pickedClass),
          });
    sendQuery(message);
    setSent(true);
  };

  useEffect(() => {
    if (sent && history.at(-1).origin !== "user") {
      onClose();
    }
  }, [sent, history]);

  return (
    <Modal
      hideClosebutton
      className="bg-bjornstigen-background-200 w-full md:w-[61.5rem] my-16 h-full  p-32 text-center"
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
                >
                  {upperFirst(t(`final:gender.${gender}`))}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col gap-[2.5rem] mb-[3.4rem]">
            <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
              {t("final:my_class_is")}
            </legend>
            <div
              role="group"
              className="flex gap-24 max-w-[400px] justify-center flex-wrap md:flex-wrap"
            >
              {classes.map((classYear, index) => (
                <RadioButton
                  iconButton
                  key={`${index}-${classYear}`}
                  value={classYear}
                  name="class"
                  checked={classYear === pickedClass}
                  onChange={(e) => setPickedClass(e.target.value)}
                >
                  {classYear}
                </RadioButton>
              ))}
            </div>
          </fieldset>
          <div className="flex gap-12">
            <Button
              disabled={!pickedClass || !pickedGender || sent}
              rounded
              type="submit"
              color="bjornstigen"
            >
              {upperFirst(t("final:send_and_exit"))}
            </Button>
            <Button
              variant="tertiary"
              showBackground={false}
              rounded
              onClick={() => window.location.reload()}
            >
              {t("common:skip")}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
