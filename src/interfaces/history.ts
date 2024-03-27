export type Origin = "user" | "assistant" | "system";

export interface ChatEntryReference {
  title: string;
  url: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  text: string;
  references?: ChatEntryReference[];
  id: string;
}

export type ChatHistory = ChatHistoryEntry[];
