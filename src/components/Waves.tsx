import { cx } from "@sk-web-gui/react";

interface WavesProps {
  className?: string;
  /**
   * Size (width) in rem
   * @default 91.6
   */
  size?: number;
}
export const Waves: React.FC<WavesProps> = ({ className, size = 91.6 }) => {
  return (
    <div
      className={cx("flex gap-[2.4%] justify-center items-center", className)}
      style={{ width: `${size}rem`, height: `${size * 0.69}rem` }}
    >
      <div className="rounded-full bg-primitives-pink-200 w-[12.2%] h-[39.7%]"></div>
      <div className="rounded-full bg-gradient-to-b from-primitives-blue-600 to-primitives-blue-300 w-[12.2%] h-[75.7%]"></div>
      <div className="rounded-full bg-primitives-green-300 w-[12.2%] h-[55%]"></div>
      <div className="rounded-full bg-gradient-to-b from-primitives-pink-200 to-primitives-pink-600 w-[12.2%] h-full"></div>
      <div className="rounded-full bg-gradient-to-b from-primitives-green-600 to-primitives-green-300 w-[12.2%] h-[62.5%]"></div>
      <div className="rounded-full bg-primitives-blue-300 w-[12.2%] h-[76.4%]"></div>
      <div className="rounded-full bg-primitives-purple-200 w-[12.2%] h-[39.4%]"></div>
    </div>
  );
};
