import React, { useState, useEffect } from "react";

export const NobushiAnimatedText = ({
  text,
  interval = 50,
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
      {text.split("").map((char, index) => {
        return (
          <React.Fragment key={index}>
            <span
              style={{
                display: index < visibleChars ? "inline-block" : "none",
                opacity: index < visibleChars ? 1 : 0,
                transition: "opacity 0.06s ease-out",
              }}
            >
              {char}
            </span>
          </React.Fragment>
        );
      })}
      {visibleChars < text.length && <span className="blinkingCursor" />}
    </>
  );
};
