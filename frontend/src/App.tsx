import Map, {
  AttributionControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useState } from "react";
import { AutoResizeTextarea } from "./components/AutoResizeTextarea";
import { NobushiSubmitButton } from "./components/NobushiSubmitButton";
import { extractDepartureAndDestination } from "./lib/gemini/extractDepartureAndDestination";
import { getNominatimResponseJsonWithCache } from "./lib/osm/getNominatim";

function App() {
  const [value, setValue] = useState("");
  const [departureString, setDepartureString] = useState("");
  const [destinationString, setDestinationString] = useState("");
  const [systemMessage, setSystemMessage] = useState(["散歩道の入力を待機中…"]);
  const [departureLatLng, setDepartureLatLng] = useState<
    [number, number] | null
  >(null);
  const [destinationLatLng, setDestinationLatLng] = useState<
    [number, number] | null
  >(null);

  const onSubmit = useCallback(async () => {
    if (value === "") {
      return;
    }
    setSystemMessage((prev) => [
      ...prev,
      "散歩道の入力確認。",
      "散歩道の地名を分析中…",
    ]);
    const result = await extractDepartureAndDestination(value);
    if (!result) {
      setSystemMessage((prev) => [...prev, "エラーが発生しました"]);
      return;
    }
    // resultは改行区切りの文字列で、1行目が出発地、2行目が目的地
    // 2行じゃなかったらおかしいのでエラーを出す
    if (result.split("\n").length !== 2) {
      setSystemMessage((prev) => [
        ...prev,
        "出発地と目的地を正しく入力してください",
      ]);
      return;
    }
    const [newDeparture, newDestination] = result.split("\n");
    setDepartureString(newDeparture);
    setDestinationString(newDestination);
    setSystemMessage((prev) => [...prev, "散歩道の地名を分析完了。"]);
  }, [value]);

  useEffect(() => {
    const doit = async () => {
      if (departureString.length > 0 && destinationString.length > 0) {
        setSystemMessage((prev) => [...prev, "散歩道の位置情報をを取得中…"]);
        const departureResult = await getNominatimResponseJsonWithCache(
          departureString
        );
        setDepartureLatLng([departureResult[0].lat, departureResult[0].lon]);
        const destinationResult = await getNominatimResponseJsonWithCache(
          destinationString
        );
        setDestinationLatLng([
          destinationResult[0].lat,
          destinationResult[0].lon,
        ]);
        setSystemMessage((prev) => [
          ...prev,
          "散歩道の位置情報を取得完了。",
          "散歩道の経路を探索中…",
        ]);
      }
    };
    doit();
  }, [departureString, destinationString]);

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
          height: "100%",
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "white",
            marginBottom: "20px",
            userSelect: "none",
          }}
        >
          宇宙野武士に散歩道を聞く
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "400px",
            height: "auto",
            padding: "10px",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <AutoResizeTextarea value={value} onChange={setValue} />
          <NobushiSubmitButton onSubmit={onSubmit} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            color: "white",
            background: "rgba(0, 0, 0, 0.5)",
            paddingLeft: "10px",
            paddingRight: "20px",
            paddingTop: "4px",
            paddingBottom: "4px",
            zIndex: 10000,
          }}
        >
          <div>
            出発地:{" "}
            {departureString.length === 0 ? (
              "不明"
            ) : (
              <>
                {departureString}
                {departureLatLng &&
                  `(${departureLatLng[0]}, ${departureLatLng[1]})`}
              </>
            )}
          </div>
          <div>
            目的地:{" "}
            {destinationString.length === 0 ? (
              "不明"
            ) : (
              <>
                {destinationString}
                {destinationLatLng &&
                  `(${destinationLatLng[0]}, ${destinationLatLng[1]})`}
              </>
            )}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            color: "white",
            background: "rgba(0, 0, 0, 0.5)",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "20px",
            paddingBottom: "10px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              gap: "10px",
              fontSize: "12px",
            }}
          >
            {systemMessage.map((message, index) => {
              return <div key={index}>{message}</div>;
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Map
          initialViewState={{
            latitude: 35.68385063,
            longitude: 139.75397279,
            zoom: 4,
          }}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="https://unopengis.github.io/foil4g/stylejson/server.arcgisonline.com/world_imagery/style.json"
          attributionControl={false}
        >
          <GeolocateControl />
          <AttributionControl position="bottom-right" />
        </Map>
      </div>
    </div>
  );
}

export default App;
