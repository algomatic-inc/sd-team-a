import { useCallback, useEffect, useRef, useState } from "react";

export const NobushiAutoResizeTextarea: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({
  value,
  onChange,
  placeholder = "人形町駅から秋葉原駅までの散歩道",
}) => {
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusToEndOfText = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [textareaRef]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
    focusToEndOfText();
  }, [mounted, focusToEndOfText]);

  useEffect(() => {
    setTimeout(() => {
      if (value.length > 0 && textareaRef.current) {
        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, 100);
  }, [textareaRef, value]);

  return (
    <textarea
      ref={textareaRef}
      style={{
        fontSize: "1.5em",
        width: "410px",
        resize: "none",
        border: "none",
        background: "transparent",
      }}
      rows={value ? value.split("\n").length : 1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};
