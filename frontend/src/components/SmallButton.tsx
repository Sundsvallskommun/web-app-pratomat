import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAppStore } from "../hooks/appStore";
import { hoverMap, ringOffsetMap } from "../utils/backgroundClassMap";

export const SmallButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  const backgroundColor = useAppStore((state) => state.backgroundColor);

  const hoverClass =
    hoverMap[backgroundColor] ?? "hover:bg-bjornstigen-surface-primary-hover";
  const ringOffsetClass =
    ringOffsetMap[backgroundColor] ?? "bg-bjornstigen-surface-primary";
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={`disabled:opacity-45 ${hoverClass} w-fit bg-transparent text-light-primary rounded-[0.8rem] border-1 border-light-primary font-header max-md:text-small font-medium px-8 py-10 md:px-12 md:py-16 focus-visible:ring ring-ring ${ringOffsetClass}`}
    />
  );
});
