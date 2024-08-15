import { useTranslation } from "react-i18next";

export const AssistantAvatar = () => {
  const { t } = useTranslation();
  return (
    <div
      aria-label={t("common:assistent")}
      className="w-40 h-12 bg-[#C7B4DA] rounded-full inline-block"
    ></div>
  );
};
