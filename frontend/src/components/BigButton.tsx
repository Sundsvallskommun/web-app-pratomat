import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAppStore } from "../hooks/appStore";
import { ringOffsetMap } from "../utils/backgroundClassMap";

export const BigButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const ringOffsetClass = ringOffsetMap[backgroundColor];

  return (
    <button
      ref={ref}
      {...props}
      className={`bg-background-content text-dark-primary py-16 md:py-[3rem] px-20 md:px-56 md:min-w-[46rem] font-header font-bold rounded-full text-[2.4rem] md:text-[4.2rem] leading-[2.4rem] md:leading-[4.2rem] disabled:opacity-45 focus-visible:ring ring-ring ${ringOffsetClass}`}
    />
  );
});
