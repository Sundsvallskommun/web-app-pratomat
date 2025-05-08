import { useChat } from "@sk-web-gui/ai";
import { Button, Modal } from "@sk-web-gui/react";
import { upperFirst } from "lodash";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadioButton } from "./RadioButton";
import { useAppStore } from "../hooks/appStore";
import { bg200Map } from "../utils/backgroundClassMap";

interface FinalModalProps {
  open: boolean;
  onClose: () => void;
}

export const FinalModal: React.FC<FinalModalProps> = ({ open, onClose }) => {
  const finalQuestions = useAppStore((state) => state.finalQuestions);
  const sessionId = useAppStore((state) => state.sessionId);
  const [sent, setSent] = useState<boolean>(false);
  const { t } = useTranslation(["common", "final"]);
  const { sendQuery, history } = useChat({ sessionId });

  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const bgVariantClass = bg200Map[backgroundColor];

  const [selected, setSelected] = useState<Record<number, string>>({});

  const handleSelect = (index: number, value: string) => {
    setSelected((selected) => ({ ...selected, [index]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const message = Object.keys(selected)
      .map((index) => {
        return finalQuestions[index].answers.find(
          (answer) => answer.value === selected[index]
        ).output;
      })
      .join(". ");
    sendQuery(message);
    setSent(true);
  };

  const isValid = finalQuestions.every((quest, index) => !!selected[index]);

  useEffect(() => {
    if (sent && history.at(-1).origin !== "user") {
      onClose();
    }
  }, [sent, history]);

  return (
    <Modal
      hideClosebutton
      className={`${bgVariantClass} w-full md:w-[61.5rem] my-16 h-full md:h-[62.8rem] p-32 text-center`}
      show={open}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <h1 className="text-[3.2rem] mb-[2.5rem]">{t("final:thank_you")}</h1>
          <p className="mb-[5.6rem] text-[1.6rem]">{t("final:description")}</p>
          {finalQuestions.map((question, index) => (
            <fieldset
              className="flex flex-col mb-[4rem]"
              key={`question-${index}`}
            >
              <legend className="text-[1.6rem] font-bold mb-[2.5rem]">
                {question.question}
              </legend>
              <div
                role="group"
                className="flex gap-12 justify-center flex-wrap md:flex-nowrap"
              >
                {question.answers.map((answer) => (
                  <RadioButton
                    key={`question-${index}-${answer.value}`}
                    value={answer.value}
                    name={`question-${index}`}
                    checked={selected[index] === answer.value}
                    onChange={(e) => handleSelect(index, e.target.value)}
                  >
                    {answer.value}
                  </RadioButton>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex gap-12">
            <Button
              disabled={!isValid || sent}
              rounded
              type="submit"
              color={backgroundColor}
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
