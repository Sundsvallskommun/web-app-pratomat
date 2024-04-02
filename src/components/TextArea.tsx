import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForkRef } from "@sk-web-gui/react";
import { Cursor } from "./Cursor";

export const TextArea = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>((props, ref) => {
  const { value, onFocus, onBlur, ...rest } = props;
  const [textBefore, setTextBefore] = useState<string>("");
  const [textAfter, setTextAfter] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    inputRef.current && inputRef.current.focus();
  };

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
        onClick={() => setInputFocus()}
      >
        {isEditing ? (
          <>
            {textBefore}
            <Cursor />
            {textAfter}
          </>
        ) : value ? (
          value
        ) : (
          <span className="opacity-40">Väntar på att du ska börja prata</span>
        )}
      </p>
      <input
        type="text"
        ref={useForkRef(ref, inputRef)}
        onFocus={(e) => {
          setIsEditing(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setIsEditing(false);
          onBlur && onBlur(e);
        }}
        className="opacity-0 h-0 w-0"
        value={value}
        {...rest}
      />
    </>
  );
});
