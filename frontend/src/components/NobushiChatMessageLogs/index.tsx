import React from "react";
import { NobushiChatMessage } from "../../types/NobushiChatMessage";
import { NobushiAnimatedText } from "../NobushiAnimatedText";

export const NobushiChatMessageLogs: React.FC<{
  messages?: NobushiChatMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}> = ({ messages, messagesEndRef }) => {
  if (!messages || messages.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        width: "24vw",
        maxHeight: "660px",
        display: "flex",
        flexDirection: "column",
        color: "white",
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(2px)",
        marginTop: "0",
        marginBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontSize: "1.2em",
        zIndex: 10000,
        overflowY: "scroll",
      }}
      className="chatMessages"
    >
      {messages.map((message, index) => {
        if (message.role === "ai") {
          return (
            <div
              key={index}
              style={{
                width: "80%",
                marginBottom: "14px",
              }}
            >
              <NobushiAnimatedText text={message.content} />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                marginLeft: "20%",
                flexDirection: "row-reverse",
                marginBottom: "14px",
              }}
            >
              <span>{message.content}</span>
            </div>
          );
        }
      })}
      <div style={{ height: "1px" }} ref={messagesEndRef} />
    </div>
  );
};
