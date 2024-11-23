import React, { useCallback, useRef, useState } from "react";

import Map, { AttributionControl, MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

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
import { NobushiAutoResizeTextarea } from "../components/NobushiAutoResizeTextarea";
import { NobushiSubmitButton } from "../components/NobushiSubmitButton";
import { NobushiGreetings } from "../components/NobushiGreetings";
import { NobushiSystemMessages } from "../components/NobushiSystemMessages";
import { NobushiChatMessageLogs } from "../components/NobushiChatMessageLogs";
import { NobushiRegionalMap } from "../components/NobushiRegionalMap";

export const RelocatePage: React.FC = () => {
  const mapRef = useRef<MapRef | null>(null);

  // systemMessages 関連
  const systemMessagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfSystemMessages =
    useScrollToBottom(systemMessagesEndRef);
  const [systemMessages, setSystemMessages] = useState([
    "移住先地域の入力を待機中…",
  ]);

  // chatMessages 関連
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottomOfChatMessages = useScrollToBottom(chatMessagesEndRef);
  const [chatMessages, setChatMessages] = useState<NobushiChatMessage[]>([]);

  // NobushiAutoResizeTextarea の入力状態
  const [inputValue, setInputValue] = useState("");

  const [inputAreas, setInputAreas] = useState<string[]>([
    "静岡県",
    "島根県",
    "宮城県",
    "長野県",
  ]);

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
          top: systemMessages.length < 2 ? 0 : 0,
          left: systemMessages.length < 2 ? 0 : "75vw",
          height: systemMessages.length < 2 ? "100%" : "98vh",
          width: systemMessages.length < 2 ? "100%" : "24vw",
          margin: "0 auto 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: systemMessages.length < 2 ? "center" : "flex-end",
          alignItems: systemMessages.length < 2 ? "center" : "flex-end",
          zIndex: 10000,
        }}
      >
        {systemMessages.length < 2 && (
          <NobushiGreetings text="地方移住をお手伝いします" />
        )}
        <NobushiChatMessageLogs
          chatMessages={chatMessages}
          chatMessagesEndRef={chatMessagesEndRef}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "24vw",
            height: "auto",
            padding: "10px",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <NobushiAutoResizeTextarea
            value={inputValue}
            onChange={setInputValue}
            placeholder="島根県に移住したい"
          />
          <NobushiSubmitButton onSubmit={onSubmit} />
        </div>
      </div>
      <>
        <NobushiSystemMessages
          systemMessages={systemMessages}
          systemMessageEndRef={systemMessagesEndRef}
        />
      </>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {inputAreas.length === 0 ? (
          <Map
            ref={mapRef}
            id="background"
            initialViewState={{
              latitude: 35.68385063,
              longitude: 139.75397279,
              zoom: 4,
            }}
            style={{ width: "100vw", height: "100vh" }}
            mapStyle="https://unopengis.github.io/foil4g/stylejson/server.arcgisonline.com/world_imagery/style.json"
            attributionControl={false}
          >
            <AttributionControl position="top-right" />
          </Map>
        ) : (
          // 2x2 のグリッドで地域ごとの地図を表示
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              height: "100vh",
              width: "100vw",
            }}
          >
            {inputAreas.map((area) => {
              return <NobushiRegionalMap region={area} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
