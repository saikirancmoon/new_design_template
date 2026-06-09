export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatCategory =
  | "school_information"
  | "educational_question"
  | "personal_conversation"
  | "sensitive_topic"
  | "admissions_guidance"
  | "off_topic";

export type KnowledgeChunk = {
  id: string;
  source: string;
  content: string;
  score: number;
};
