import { NobushiAnimatedText } from "../NobushiAnimatedText";

export const NobushiSystemMessages: React.FC<{
  systemMessages: string[];
  systemMessageEndRef: React.RefObject<HTMLDivElement>;
}> = ({ systemMessages, systemMessageEndRef }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        color: "white",
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(2px)",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "4px",
        paddingBottom: "4px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          gap: "10px",
          maxHeight: "250px",
          overflowY: "scroll",
        }}
        className="systemMessage"
      >
        {systemMessages.map((message, index) => {
          return (
            <div
              key={index}
              style={{
                marginRight: "20px",
              }}
            >
              <NobushiAnimatedText text={message} />
              {index === systemMessages.length - 1 &&
                systemMessages[systemMessages.length - 1].endsWith("…") && (
                  <span className="blinkingCursor" />
                )}
            </div>
          );
        })}
        <div style={{ height: "1px" }} ref={systemMessageEndRef} />
      </div>
    </div>
  );
};
