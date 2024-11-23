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
                width: "600px",
                display: "flex",
                flexDirection: "column",
                color: "white",
                background: "rgba(0, 0, 0, 0.5)",
                marginTop: "0",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
                fontSize: "1.4em",
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
