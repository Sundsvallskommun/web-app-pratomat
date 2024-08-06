import { cx } from "@sk-web-gui/react";

interface CursorProps {
  size: "lg" | "sm";
}

export const Cursor: React.FC<CursorProps> = ({ size = "lg" }) => {
  return (
    <span
      className={cx(
        "absolute inline-block  bg-gradient-to-b from-[#88ACF9] to-[#66C5B7] rounded-full animate-blink",
        size === "lg"
          ? " -mr-4 w-4 sm:-mr-[0.5rem] sm:w-[0.5rem] md:-mr-6 md:w-6 h-[2.115rem] sm:h-[3.3rem] md:h-[3.5rem] lg:h-[4.7rem]"
          : " -mr-3 w-3 sm:-mr-3 sm:w-3 md:-mr-4 md:w-4 h-[1.7rem] sm:h-[1.9rem] md:h-[2.1rem] lg:h-[2.5rem]"
      )}
    ></span>
  );
};
