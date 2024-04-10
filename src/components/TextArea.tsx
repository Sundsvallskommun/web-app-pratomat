import {
  ComponentPropsWithoutRef,
  MouseEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForkRef } from "@sk-web-gui/react";
import { Cursor } from "./Cursor";

interface TextAreaProps
  extends Omit<ComponentPropsWithoutRef<"input">, "onClick"> {
  errorMessage?: string;
  listening?: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  value?: string;
}
export const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(
  (props, ref) => {
    const {
      value,
      onFocus,
      onBlur,
      onClick,
      errorMessage,
      listening,
      placeholder,
      ...rest
    } = props;
    const [textBefore, setTextBefore] = useState<string>("");
    const [textAfter, setTextAfter] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCaret = () => {
      if (inputRef.current) {
        const position = inputRef.current.selectionStart;
        setTextBefore(inputRef.current.value.substring(0, position));
        setTextAfter(inputRef.current.value.substring(position));
      }
    };

    useEffect(() => {
      document.addEventListener("selectionchange", handleCaret);
    }, []);

    useEffect(() => {
      if (inputRef.current) {
        handleCaret();
      }
    }, [value]);

    return (
      <>
        <p
          className="font-display text-large sm:text-[3rem] md:text-[4rem] text-light-primary hyphens-auto leading-[100%]"
          onClick={(e) => {
            onClick && onClick(e);
          }}
        >
          {errorMessage ? (
            errorMessage
          ) : isEditing || listening ? (
            value ? (
              <>
                {textBefore.replace(" ", " ")}
                <Cursor />
                {textAfter.replace(" ", " ")}
              </>
            ) : (
              <>
                <Cursor />
                <span className="opacity-40">{placeholder}</span>
              </>
            )
          ) : value ? (
            value.replace(" ", " ")
          ) : (
            <span className="opacity-40">{placeholder}</span>
          )}
        </p>
        <input
          type="text"
          placeholder={placeholder}
          ref={useForkRef(ref, inputRef)}
          onFocus={(e) => {
            setIsEditing(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsEditing(false);
            onBlur && onBlur(e);
          }}
          className="opacity-0 h-0 w-full"
          value={value}
          {...rest}
        />
      </>
    );
  }
);
