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
      className="disabled:opacity-45 hover:bg-bjornstigen-surface-primary-hover w-fit bg-transparent text-light-primary rounded-[0.8rem] border-1 border-light-primary font-header max-md:text-small font-medium px-8 py-10 md:px-12 md:py-16 focus-visible:ring ring-ring ring-offset-bjornstigen-surface-primary"
    />
  );
});
