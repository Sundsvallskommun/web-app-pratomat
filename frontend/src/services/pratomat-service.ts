import { useEffect, useState } from "react";
import { useAppStore } from "../hooks/appStore";
import { useAssistantStore } from "@sk-web-gui/ai";
import { ApiResponse, apiService } from "./api-service";
import {
  PublicAssistant,
  PublicAssistantSummary,
} from "../interfaces/assistant.interface";

export const usePratomat = (
  id: number | string
): { loaded: boolean; pratomat?: PublicAssistant } => {
  const [setQuestion, setFinalQuestions, setStartText, setSubmitText] =
    useAppStore((state) => [
      state.setQuestion,
      state.setFinalQuestions,
      state.setStartText,
      state.setSubmitText,
    ]);
  const [setSettings] = useAssistantStore((state) => [state.setSettings]);
  const [setBackgroundColor] = useAppStore((state) => [
    state.setBackgroundColor,
  ]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    apiService
      .get<ApiResponse<PublicAssistant>>(`/assistants/public/${id}`)
      .then((res) => {
        const data = res?.data?.data;

        if (data) {
          setQuestion(data.question);
          setFinalQuestions(data.finalQuestions);
          setSettings({
            app: data.app,
            assistantId: data.assistantId,
            hash: data.hash,
            user: "",
          });
          setStartText(data.startText);
          setSubmitText(data.submitText);
          setBackgroundColor(data.backgroundColor);
          setLoaded(true);
        }
      });
  }, [id]);

  return { loaded };
};

export const usePratomatList = (): {
  data?: PublicAssistantSummary[];
  loaded: boolean;
} => {
  const [data, setData] = useState<PublicAssistantSummary[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    apiService
      .get<ApiResponse<PublicAssistantSummary[]>>("/assistants/public/all")
      .then((res) => {
        const pratomats = res?.data?.data;
        if (pratomats) {
          setData(pratomats);
          setLoaded(true);
        }
      });
  }, []);

  return { data, loaded };
};
