import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";
import { useCallback } from "react";
import { useAppContext } from "../context/app.context";
import { useAssistant } from "../context/assistant-context";
import {
  ChatEntryReference,
  ChatHistory,
  ChatHistoryEntry,
  Origin,
} from "../interfaces/history";
import { ResponseData } from "../interfaces/responseData";
import { SkHeaders } from "../interfaces/skHeaders";
import { batchQuery } from "../services/query-service";

const MAX_REFERENCE_COUNT = 3;

function useChat() {
  const stream = import.meta.env.VITE_STREAM_DEFAULT === "true";
  const { assistantId, sessionId, setSessionId, user, hash } = useAppContext();
  const { history, setHistory, clearHistory, done, setDone } = useAssistant();

  const addHistoryEntry = (
    origin: Origin,
    text: string,
    id: string,
    references?: ChatEntryReference[]
  ) => {
    const historyEntry: ChatHistoryEntry = {
      origin: origin,
      text,
      id,
      ...(references && { references }),
    };
    setHistory((history: ChatHistory) => {
      return [...history, historyEntry];
    });
  };

  const streamQuery = useCallback(
    (query: string, assistantId: string, session_id: string, u, h) => {
      const myController = new AbortController();
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry("user", query, questionId);
      setDone(false);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/assistants/${assistantId}/sessions/${session_id || ""}?stream=true`;

      let _id;
      let references: ChatEntryReference[];

      const skHeaders: SkHeaders = {
        _skuser: u,
        _skassistant: assistantId,
        _skhash: h,
        _skapp: import.meta.env.VITE_APPLICATION,
      };

      fetchEventSource(url, {
        method: "POST",
        signal: myController.signal,
        body: JSON.stringify({ body: query }),
        headers: {
          Accept: "text/event-stream",
          ...skHeaders,
        },
        onopen(res: Response) {
          setDone(false);
          if (res.ok && res.status === 200) {
            setHistory((history: ChatHistory) => {
              return [
                ...history,
                {
                  origin: "assistant",
                  text: "",
                  id: answerId,
                },
              ];
            });
          } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
          ) {
            addHistoryEntry(
              "system",
              "Ett fel inträffade, assistenten gav inget svar.",
              answerId,
              []
            );
            console.error("Client-side error ", res);
          }
          return Promise.resolve();
        },
        onmessage(event: EventSourceMessage) {
          let parsedData: ResponseData;

          try {
            parsedData = JSON.parse(event.data);
          } catch (error) {
            console.error("Error when parsing response as json. Returning.");
            return;
          }
          if (!sessionId) {
            _id = parsedData.session_id;
          }
          (references =
            parsedData.references
              ?.filter((r) => !!r.metadata.url)
              .map((r) => ({
                title: r.metadata.title || r.metadata.url,
                url: r.metadata.url,
              })) || []),
            setHistory((history: ChatHistory) => {
              const newHistory = [...history];
              const index = history.findIndex((chat) => chat.id === answerId);
              if (index === -1) {
                newHistory.push({
                  origin: "assistant",
                  text: parsedData.answer,
                  id: answerId,
                });
              } else {
                newHistory[index] = {
                  origin: "assistant",
                  text: history[index]?.text + parsedData.answer,
                  id: answerId,
                };
              }

              return newHistory;
            });
        },
        onclose() {
          if (!sessionId) {
            setSessionId(_id);
          }
          let answer = "";
          setHistory((history: ChatHistory) => {
            const newHistory = [...history];
            const index = newHistory.findIndex((chat) => chat.id === answerId);
            answer = history[index].text;

            newHistory[index] = {
              origin: history[index].origin,
              text: answer,
              id: answerId,
              references: references.slice(0, MAX_REFERENCE_COUNT),
            };
            return newHistory;
          });
          setDone(true);
        },
        onerror(err: unknown) {
          console.error("There was an error from server", err);
          addHistoryEntry(
            "system",
            "Ett fel inträffade, kunde inte kommunicera med assistent.",
            "0",
            []
          );
          setDone(true);
        },
      });
    },

    []
  );

  const sendQuery = (query: string) => {
    if (!assistantId || !hash) {
      addHistoryEntry(
        "system",
        "Ett fel inträffade, assistenten gav inget svar.",
        "0",
        []
      );
      setDone(true);
      return;
    }
    if (stream) {
      streamQuery(query, assistantId, sessionId, user, hash);
    } else {
      setDone(false);
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry("user", query, questionId);
      return batchQuery(query, assistantId, sessionId, user, hash)
        .then((res: ResponseData) => {
          if (!sessionId) {
            setSessionId(res.session_id);
          }
          addHistoryEntry(
            "assistant",
            res.answer,
            answerId,
            res.references?.slice(0, MAX_REFERENCE_COUNT).map((r) => ({
              title: r.metadata.title,
              url: r.metadata.url,
            })) || []
          );
          setDone(true);
          return res;
        })
        .catch((e) => {
          console.error("Error occured:", e);
          addHistoryEntry(
            "system",
            "Ett fel inträffade, assistenten gav inget svar.",
            answerId,
            []
          );
          setDone(true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
    done,
    sendQuery,
    setSessionId,
  };
}

export default useChat;
