import { Button, Icon, Spinner, Tooltip, cx, useGui } from "@sk-web-gui/react";
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  FocusEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { useTranslation } from "react-i18next";

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
      onFocus,
      onBlur,
      value: _value,
      placeholder,
      loading,
      ...rest
    } = props;
    const { theme } = useGui();
    const isSm = useMediaQuery(`screen and (max-width:${theme.screens.md})`);
    const [value, setValue] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const usedValue = _value !== undefined ? _value : value;
    const [buttonFocus, setButtonFocus] = useState<boolean>(false);
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const [dictateFocus, setDictateFocus] = useState<boolean>(false);
    const [dictateHover, setDictateHover] = useState<boolean>(false);
    const { listening, transcript, start, stop, reset, error } =
      useSpeechToText();

    const dictRef = useRef<HTMLElement>(null);

    const { t } = useTranslation(["common", "chat"]);

    useOnClickOutside(dictRef, () => {
      stop();
    });

    useEffect(() => {
      reset();
    }, []);

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

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      stop();
      onFocus && onFocus(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(event);
    };

    useEffect(() => {
      if (buttonDisabled) {
        setButtonFocus(false);
      }
    }, [buttonDisabled]);

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
        <span
          ref={dictRef}
          tabIndex={1}
          role="button"
          aria-label={t("common:listen")}
          aria-disabled={!!error}
          onClick={() => handleDictation()}
          onKeyDown={(e) => {
            e.key === "Enter" && handleDictation();
          }}
          aria-pressed={listening}
          className={cx(
            "absolute h-48 sm:h-56 md:h-80 flex items-center left-0 z-10 group",
            "md:px-16 px-8"
          )}
          onFocus={() => setDictateFocus(true)}
          onBlur={() => setDictateFocus(false)}
          onMouseEnter={() => setDictateHover(true)}
          onMouseLeave={() => setDictateHover(false)}
        >
          {(dictateHover || dictateFocus) && (
            <Tooltip
              className="absolute left-full -ml-16 capitalize z-10"
              position="right"
            >
              {t("common:listen")}
            </Tooltip>
          )}
          <>
            <Icon
              name="mic"
              rounded
              size={isSm ? 24 : 32}
              className={cx(
                "text-bjornstigen-surface-primary group-focus-visible:ring ring-ring"
              )}
            />
            {listening && (
              <Icon
                name="mic"
                rounded
                size={isSm ? 24 : 32}
                className={cx(
                  "absolute text-bjornstigen-surface-primary group-focus-visible:ring ring-ring",
                  "animate-ping"
                )}
              />
            )}
          </>
        </span>

        <input
          ref={ref}
          tabIndex={1}
          onChange={handleChange}
          placeholder={listening ? t("chat:talk_to_continue") : placeholder}
          value={usedValue}
          {...rest}
          className={cx(
            "font-medium  w-full h-48 sm:h-56 md:h-80 rounded-[0.8rem] bg-background-content opacity-85 focus:opacity-100 pl-[4.4rem] md:pl-[5.9rem] pr-[4.8rem] md:pr-[7.3rem] placeholder:text-black/50 text-dark-primary focus-visible:ring ring-ring ring-offset-0"
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="absolute flex items-center h-48 sm:h-56 md:h-80 right-8 md:right-16 top-0">
          <Button
            ref={buttonRef}
            aria-label={t("common:send")}
            tabIndex={1}
            type="submit"
            size={isSm ? "sm" : "md"}
            iconButton
            disabled={buttonDisabled}
            color="bjornstigen"
            onFocus={() => setButtonFocus(true)}
            onBlur={() => setButtonFocus(false)}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            {loading ? (
              <Spinner size={isSm ? 3.2 : 4} />
            ) : (
              <Icon name="arrow-up" />
            )}
          </Button>
          {(buttonFocus || buttonHover) && (
            <Tooltip
              className="absolute right-full capitalize z-10"
              position="left"
            >
              {t("common:send")}
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
);
