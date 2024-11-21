export const NobushiSubmitButton: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      style={{
        display: "block",
        padding: "4px",
        height: "34px",
        width: "34px",
        borderRadius: "0.375rem",
        background: "#002840",
        border: "none",
        fontSize: "1.5em",
      }}
    >
      <img
        width={24}
        height={24}
        style={{
          userSelect: "none",
        }}
        src="https://i.gyazo.com/db517ff9d3f0f54257692d0b43adada6.png"
      />
    </button>
  );
};
