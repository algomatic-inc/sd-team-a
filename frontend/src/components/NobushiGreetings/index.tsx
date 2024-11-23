import { NobushiAnimatedText } from "../NobushiAnimatedText";

export const NobushiGreetings: React.FC<{
  text?: string;
}> = ({ text = "お手伝いできることはありますか？" }) => {
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
      <NobushiAnimatedText text={text} />
    </div>
  );
};
