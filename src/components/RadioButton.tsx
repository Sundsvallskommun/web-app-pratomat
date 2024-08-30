import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { cx } from "@sk-web-gui/react";

interface RadioButtonProps extends ComponentPropsWithoutRef<"input"> {
  children?: ReactNode;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => {
    const { children, checked, className, ...rest } = props;
    return (
      <label
        className={cx(
          "sk-btn sk-btn-lg sk-btn-primary focus-within:ring ring-ring",
          className
        )}
        data-rounded="true"
        data-inverted={checked ? "false" : "true"}
        data-color="primary"
      >
        <input
          autoFocus={false}
          ref={ref}
          checked={checked}
          type="radio"
          className="sr-only"
          {...rest}
        />
        {children}
      </label>
    );
  }
);
