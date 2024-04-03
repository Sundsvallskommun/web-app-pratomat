import { Button, Icon, cx, Spinner, useGui } from "@sk-web-gui/react";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { Waves } from "./Waves";

interface ChatInputProps extends ComponentPropsWithoutRef<"input"> {
  buttonDisabled?: boolean;
  onChangeValue?: (value: string) => void;
  loading?: boolean;
}
export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (props, ref) => {
    const {
      className,
      buttonDisabled,
      onChange,
      onChangeValue,
      value: _value,
      placeholder,
      loading,
      ...rest
    } = props;
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const { theme } = useGui();
    const isSm = useMediaQuery(`screen and (max-width:${theme.screens.md})`);
    const [value, setValue] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const usedValue = _value !== undefined ? _value : value;
    const { listening, transcript, start, stop, reset, error } =
      useSpeechToText();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      onChange && onChange(event);
    };

    useEffect(() => {
      onChangeValue && onChangeValue(value);
    }, [value, onChangeValue]);

    const handleDictation = () => {
      if (listening) {
        stop();
      } else {
        reset();
        start();
      }
    };

    useEffect(() => {
      setValue(transcript);
    }, [transcript]);

    useEffect(() => {
      if (!listening && value && buttonRef.current) {
        buttonRef.current.click();
      }
      //eslint-disable-next-line
    }, [listening]);

    return (
      <div className={cx("h-48 sm:h-56 md:h-80 relative w-full", className)}>
        {!hasFocus && (
          <span
            role="button"
            onClick={() => handleDictation()}
            className="absolute h-48 sm:h-56 md:h-80 flex items-center left-16 z-10"
          >
            {listening ? (
              <Waves animate size={isSm ? 3.2 : 4} />
            ) : (
              <Icon
                disabled={!!error}
                name="mic"
                size={isSm ? 24 : 32}
                className={cx(
                  "text-bjornstigen-surface-primary disabled:opacity-45",
                  listening ? "animate-ping" : ""
                )}
              />
            )}
          </span>
        )}
        <input
          ref={ref}
          onChange={handleChange}
          placeholder={listening ? "Tala för att fortsätta" : placeholder}
          value={usedValue}
          {...rest}
          className={cx(
            "font-medium  w-full h-48 sm:h-56 md:h-80 rounded-[0.8rem] bg-background-content opacity-85 focus:opacity-100 pl-[5.9rem] focus:pl-16 pr-[7.3rem] placeholder:text-black/50 text-dark-primary focus-visible:ring ring-ring ring-offset-0"
          )}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        <div className="absolute flex items-center h-48 sm:h-56 md:h-80 right-16 top-0">
          <Button
            ref={buttonRef}
            type="submit"
            size={isSm ? "sm" : "md"}
            iconButton
            disabled={buttonDisabled}
            color="bjornstigen"
          >
            {loading ? (
              <Spinner size={isSm ? 3.2 : 4} />
            ) : (
              <Icon name="arrow-up" />
            )}
          </Button>
        </div>
      </div>
    );
  }
);
