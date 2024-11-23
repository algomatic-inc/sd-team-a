import React from "react";

export const NobushiExplain: React.FC<{ explain?: string }> = ({ explain }) => {
  return (
    <>
      {explain && (
        <>
          <div>
            <h2
              style={{
                textAlign: "center",
                color: "white",
                margin: "10px 0 0",
                paddingTop: "10px",
                background: "rgba(0, 0, 0, 0.5)",
              }}
            >
              宇宙野武士の道語り:
            </h2>
            <div
              style={{
                width: "24vw",
                display: "flex",
                flexDirection: "column",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
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
              {explain}
            </div>
          </div>
        </>
      )}
    </>
  );
};
