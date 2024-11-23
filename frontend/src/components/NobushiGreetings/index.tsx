import { NobushiAnimatedText } from "../NobushiAnimatedText";

export const NobushiGreetings = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: 600,
        color: "white",
        marginBottom: "20px",
        userSelect: "none",
      }}
    >
      <NobushiAnimatedText text="お手伝いできることはありますか？" />
    </div>
  );
};
