import { useState, useEffect } from "react";

export const NobushiAnimatedText = ({
  text,
  interval = 10,
}: {
  text: string;
  interval?: number;
}) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (visibleChars < text.length) {
      const timer = setTimeout(() => {
        setVisibleChars((prev) => prev + 1);
      }, interval);

      // クリーンアップ
      return () => clearTimeout(timer);
    }
  }, [visibleChars, text, interval]);

  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: index < visibleChars ? 1 : 0,
            transition: "opacity 0.01s ease-in-out",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
