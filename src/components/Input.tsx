import { Button, Icon, cx, Spinner } from "@sk-web-gui/react";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  buttonDisabled?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, buttonDisabled, ...rest } = props;
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  return (
    <div className="h-80 relative">
      {!hasFocus && (
        <span className="absolute h-80 flex items-center left-16 z-10">
          <Icon
            name="mic"
            size={32}
            className="text-bjornstigen-surface-primary"
          />
        </span>
      )}
      <input
        ref={ref}
        {...rest}
        className={cx(
          "font-medium h-80 rounded-[0.8rem] bg-background-content opacity-85 focus:opacity-100 pl-[5.9rem] focus:pl-16 pr-[7.3rem] placeholder:text-black/50 text-dark-primary focus-visible:ring ring-ring ring-offset-0",
          className
        )}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
      <div className="absolute flex items-center h-80 right-16 top-0">
        <Button
          type="submit"
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
