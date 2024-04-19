import {
  Button,
  Icon,
  Spinner,
  Tooltip,
  cx,
  useGui,
  useForkRef,
} from "@sk-web-gui/react";
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

interface ChatInputProps extends ComponentPropsWithoutRef<"textarea"> {
  buttonDisabled?: boolean;
  onChangeValue?: (value: string) => void;
  loading?: boolean;
}
export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
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
    const [buttonHover, setButtonHover] = useState<boolean>(false);
    const [dictateHover, setDictateHover] = useState<boolean>(false);
    const { listening, transcript, start, stop, reset, error } =
      useSpeechToText();

    const dictRef = useRef<HTMLElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { t } = useTranslation(["common", "chat"]);

    useOnClickOutside(dictRef, () => {
      stop();
    });

    useEffect(() => {
      reset();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

    const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      stop();
      onFocus && onFocus(event);
    };

    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      onBlur && onBlur(event);
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

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    }, [value]);

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
          onFocus={() => setDictateHover(true)}
          onBlur={() => setDictateHover(false)}
          onMouseEnter={() => setDictateHover(true)}
          onMouseLeave={() => setDictateHover(false)}
        >
          {dictateHover && (
            <Tooltip
              className="absolute bottom-full -ml-24 -mb-24 capitalize z-10"
              position="above"
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
        <div
          className={cx(
            "font-medium w-full h-48 sm:h-56 md:h-80 rounded-[0.8rem] bg-background-content opacity-85 focus-within:opacity-100 focus-within:ring ring-ring ring-offset-0 overflow-hidden"
          )}
        >
          <textarea
            ref={useForkRef(ref, textareaRef)}
            tabIndex={1}
            onChange={handleChange}
            placeholder={listening ? t("chat:talk_to_continue") : placeholder}
            value={usedValue}
            {...rest}
            className={cx(
              "font-medium resize-none pt-[2.6rem] pb-16 placeholder:text-black/50 text-dark-primary w-full h-full bg-transparent pl-[4.4rem] md:pl-[5.9rem] pr-[4.8rem] md:pr-[7.3rem]"
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
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
            onFocus={() => setButtonHover(true)}
            onBlur={() => setButtonHover(false)}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            {loading ? (
              <Spinner size={isSm ? 3.2 : 4} />
            ) : (
              <Icon name="arrow-up" />
            )}
          </Button>
          {buttonHover && (
            <Tooltip
              className="absolute bottom-full -mb-24 -ml-18 capitalize z-10"
              position="above"
            >
              {t("common:send")}
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
);
