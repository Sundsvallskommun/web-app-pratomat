import "regenerator-runtime/runtime";

import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface SpeechToTextError {
  code: "BROWSER_NOT_SUPPORTED" | "MIC_NOT_AVAILABLE";
  message: string;
}

interface SpeechToTextData {
  transcript: string;
  listening: boolean;
  error?: SpeechToTextError;
  start: () => void;
  stop: () => void;
  toggleListening: () => void;
  reset: () => void;
}

type UseSpeechToText = (
  continuous?: boolean,
  lang?: string
) => SpeechToTextData;

export const useSpeechToText: UseSpeechToText = (
  continuous = false,
  lang = "sv-SE"
) => {
  const [error, setError] = useState<SpeechToTextError | undefined>(undefined);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({
    clearTranscriptOnListen: false,
  });

  const toggleListening = () => {
    if (listening) {
      stop();
    } else {
      start();
    }
  };

  const handleHotKeys = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case " ": {
          toggleListening();
          break;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleHotKeys);

    return () => {
      document.removeEventListener("keypress", handleHotKeys);
    };
  }, []);

  const debounceStopListening = useCallback(
    debounce(() => {
      if (!continuous) {
        SpeechRecognition.stopListening();
      }
    }, 3000),
    [continuous]
  );

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError({
        code: "BROWSER_NOT_SUPPORTED",
        message: "Din webbläsare stöder inte speech recognition.",
      });
    } else if (!isMicrophoneAvailable) {
      setError({
        code: "MIC_NOT_AVAILABLE",
        message: "Du måste tillåta att webbsidan använder din mikrofon.",
      });
    } else {
      setError(undefined);
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  const start = () => {
    SpeechRecognition.startListening({
      language: lang,
      continuous: true,
    });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (listening && transcript) {
      debounceStopListening();
    }
    //eslint-disable-next-line
  }, [transcript, listening]);

  return {
    transcript,
    listening,
    error,
    start,
    stop,
    toggleListening,
    reset: resetTranscript,
  };
};
