import React from "react";
import { NobushiChatMessage } from "../../types/NobushiChatMessage";

export const NobushiChatMessageLogs: React.FC<{
  messages?: NobushiChatMessage[];
}> = ({ messages }) => {
  if (!messages) {
    return null;
  }
  if (messages.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        width: "24vw",
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
      }}
    >
      {messages.map((message, index) => {
        console.log(message.content);
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: message.role === "user" ? "row-reverse" : "row",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.role === "user" ? "flex-end" : "flex-start",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.role === "user" ? "flex-end" : "flex-start",
                  padding: "2px",
                  color: "white",
                  borderRadius: "10px",
                  maxWidth: "75%",
                }}
              >
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
