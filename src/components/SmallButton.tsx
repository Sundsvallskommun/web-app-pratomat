import { ComponentPropsWithoutRef, forwardRef } from "react";

export const SmallButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className="w-fit bg-transparent text-light-primary rounded-[0.8rem] border-1 border-light-primary font-header font-medium px-8 py-10 sm:px-12 sm:py-16"
    />
  );
});
