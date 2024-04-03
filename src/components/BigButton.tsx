import { ComponentPropsWithoutRef, forwardRef } from "react";

export const BigButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="bg-background-content text-dark-primary py-[3rem] px-[4rem] font-header text-[4.2rem] font-bold rounded-full leading-[4.2rem] disabled:opacity-45"
    />
  );
});
