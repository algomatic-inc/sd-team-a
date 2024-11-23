export type NobushiChatMessage = {
  role: "user" | "ai";
  type: "text" | "explain";
  content: string;
};
