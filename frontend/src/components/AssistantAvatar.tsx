import { useTranslation } from "react-i18next";
import { useAppStore } from "../hooks/appStore";
import { cx } from "@sk-web-gui/react";
import { bgSurfaceAccentMap } from "../utils/backgroundClassMap";

export const AssistantAvatar = () => {
  const { t } = useTranslation();
  const color = useAppStore((state) => state.backgroundColor);

  const surfaceColor = bgSurfaceAccentMap[color];

  return (
    <div
      aria-label={t("common:assistent")}
      className={cx("w-40 h-12 rounded-full inline-block", surfaceColor)}
    ></div>
  );
};
