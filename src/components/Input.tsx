import { Button, Icon, cx, Spinner, useGui } from "@sk-web-gui/react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  buttonDisabled?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, buttonDisabled, ...rest } = props;
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const { theme } = useGui();
  const isSm = useMediaQuery(`screen and (max-width:${theme.screens.md})`);

  return (
    <div className="h-48 sm:h-56 md:h-80 relative">
      {!hasFocus && (
        <span className="absolute h-48 sm:h-56 md:h-80 flex items-center left-16 z-10">
          <Icon
            name="mic"
            size={isSm ? 24 : 32}
            className="text-bjornstigen-surface-primary"
          />
        </span>
      )}
      <input
        ref={ref}
        {...rest}
        className={cx(
          "font-medium h-48 sm:h-56 md:h-80 rounded-[0.8rem] bg-background-content opacity-85 focus:opacity-100 pl-[5.9rem] focus:pl-16 pr-[7.3rem] placeholder:text-black/50 text-dark-primary focus-visible:ring ring-ring ring-offset-0",
          className
        )}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
      <div className="absolute flex items-center h-48 sm:h-56 md:h-80 right-16 top-0">
        <Button
          type="submit"
          size={isSm ? "sm" : "md"}
          iconButton
          disabled={buttonDisabled}
          className="opacity-45 hover:opacity-100 focus:opacity-100"
          color="bjornstigen"
        >
          {buttonDisabled ? <Spinner /> : <Icon name="arrow-up" />}
        </Button>
      </div>
    </div>
  );
});
