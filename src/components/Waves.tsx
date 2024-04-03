import { cx } from "@sk-web-gui/react";
import { ComponentPropsWithoutRef } from "react";

interface WavesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  /**
   * Size (width) in rem
   * @default 91.6
   */
  size?: number;
  /**
   * If the waves should animate
   */
  animate?: boolean;
}
export const Waves: React.FC<WavesProps> = (props) => {
  const { className, size = 91.6, animate, ...rest } = props;
  return (
    <div
      {...rest}
      className={cx("flex gap-[2.4%] justify-center items-center", className)}
      style={{ width: `${size}rem`, height: `${size * 0.69}rem` }}
    >
      <div
        className={cx(
          "rounded-full bg-primitives-pink-200 w-[12.2%] h-[39.7%]",
          animate ? "animate-[stretch_1s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-gradient-to-b from-primitives-blue-600 to-primitives-blue-300 w-[12.2%] h-[75.7%]",
          animate ? "animate-[stretch_2s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-primitives-green-300 w-[12.2%] h-[55%]",
          animate ? "animate-[stretch_0.5s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-gradient-to-b from-primitives-pink-200 to-primitives-pink-600 w-[12.2%] h-full",
          animate ? "animate-[stretch_1.2s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-gradient-to-b from-primitives-green-600 to-primitives-green-300 w-[12.2%] h-[62.5%]",
          animate ? "animate-[stretch_0.8s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-primitives-blue-300 w-[12.2%] h-[76.4%]",
          animate ? "animate-[stretch_1.1s_infinite]" : ""
        )}
      ></div>
      <div
        className={cx(
          "rounded-full bg-primitives-purple-200 w-[12.2%] h-[39.4%]",
          animate ? "animate-[stretch_0.7s_infinite]" : ""
        )}
      ></div>
    </div>
  );
};
