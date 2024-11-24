import React, { useCallback, useRef, useState } from "react";

// libs
/*
// osm
import { getNominatimResponseJsonWithCache } from "../lib/osm/getNominatim";
import { getValhallaResponseJsonWithCache } from "../lib/osm/getValhalla";
import { decodePolyline } from "../lib/osm/decodePolyline";
// maplibre
import { fitBoundsToGeoJson } from "../lib/maplibre/fitBoundsToGeoJson";
// gemini
import { extractDepartureAndDestination } from "../lib/gemini/extractDepartureAndDestination";
import { explainSatelliteImagery } from "../lib/gemini/explainRouteImagery";
import { getRouteSatelliteImageryUrl } from "../lib/nobushi/getRouteSatelliteImageryUrl";
*/

// types
import { NobushiChatMessage } from "../types/NobushiChatMessage";

// hooks
import { useScrollToBottom } from "../hooks/scrollToBottom";

// components
/*
import { NobushiAutoResizeTextarea } from "../components/NobushiAutoResizeTextarea";
import { NobushiSubmitButton } from "../components/NobushiSubmitButton";
import { NobushiGreetings } from "../components/NobushiGreetings";
import { NobushiSystemMessages } from "../components/NobushiSystemMessages";
import { NobushiChatMessageLogs } from "../components/NobushiChatMessageLogs";
*/
import { NobushiRegionalMap } from "../components/NobushiRegionalMap";
import { NobushiRelocateAreaSelector } from "../components/NobushiRelocateAreaSelector";
import { NobushiAnimatedText } from "../components/NobushiAnimatedText";

export const RelocatePage: React.FC = () => {
  // systemMessages 関連
  const systemMessagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfSystemMessages =
    useScrollToBottom(systemMessagesEndRef);
  const [systemMessages, setSystemMessages] = useState([
    "各地域でピンを立ててください…",
  ]);

  // chatMessages 関連
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfChatMessages = useScrollToBottom(chatMessagesEndRef);
  const [chatMessages, setChatMessages] = useState<NobushiChatMessage[]>([]);

  // NobushiAutoResizeTextarea の入力状態
  const [inputValue, setInputValue] = useState("");

  const [area1, setArea1] = useState<string>("島根県松江市");
  const [area2, setArea2] = useState<string>("静岡県伊豆市");
  const [area3, setArea3] = useState<string>("福岡県福岡市");
  const [area4, setArea4] = useState<string>("沖縄県那覇市");

  // systemMessage に表示する内容を更新する関数
  const insertNewSystemMessage = useCallback(
    (message: string) => {
      setSystemMessages((prev) => [...prev, message]);
      scrollToBottomOfSystemMessages();
    },
    [scrollToBottomOfSystemMessages]
  );

  // chatMessage に表示する内容を更新する関数
  const insertNewChatMessage = useCallback(
    (message: NobushiChatMessage) => {
      setChatMessages((prev) => [...prev, message]);
      scrollToBottomOfChatMessages();
    },
    [scrollToBottomOfChatMessages]
  );

  const onSubmit = useCallback(async () => {
    insertNewChatMessage({
      role: "user",
      type: "text",
      content: inputValue,
    });
    insertNewSystemMessage("ユーザーの入力を分析中…");
  }, [insertNewChatMessage, inputValue, insertNewSystemMessage]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          display: "none",
          //display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          zIndex: 100000,
        }}
      >
        <h1>
          <NobushiAnimatedText text="地方移住支援システム" interval={80} />
        </h1>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          zIndex: 999,
        }}
      >
        {
          // ユーザープロフィールを取得完了後に、
          // 2x2 のグリッドで地域ごとの地図を表示
        }
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            height: "100vh",
            width: "100vw",
          }}
        >
          {[area1, area2, area3, area4].map((area, idx) => {
            return (
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                }}
              >
                <NobushiRegionalMap
                  region={area}
                  attributionPosition={
                    idx === 0
                      ? "bottom-right"
                      : idx === 1
                      ? "bottom-left"
                      : idx === 2
                      ? "top-right"
                      : "top-left"
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    [idx < 2 ? "bottom" : "top"]: "25px",
                    [idx % 2 === 0 ? "right" : "left"]: "5px",
                    color: "white",
                  }}
                >
                  <NobushiRelocateAreaSelector
                    currentAreas={[area1, area2, area3, area4]}
                    currentArea={area}
                    onSelect={(newArea) => {
                      console.log(newArea, idx);
                      switch (idx) {
                        case 0:
                          setArea1(newArea);
                          break;
                        case 1:
                          setArea2(newArea);
                          break;
                        case 2:
                          setArea3(newArea);
                          break;
                        case 3:
                          setArea4(newArea);
                          break;
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
