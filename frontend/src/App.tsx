import Map, {
  AttributionControl,
  GeolocateControl,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import * as turf from "@turf/turf";
import { useCallback, useEffect, useRef, useState } from "react";
import { AutoResizeTextarea } from "./components/AutoResizeTextarea";
import { NobushiSubmitButton } from "./components/NobushiSubmitButton";
import { extractDepartureAndDestination } from "./lib/gemini/extractDepartureAndDestination";
import { getNominatimResponseJsonWithCache } from "./lib/osm/getNominatim";
import { getValhallaResponseJsonWithCache } from "./lib/osm/getValhalla";
import { decodePolyline } from "./lib/osm/decodePolyline";
import { Layer } from "react-map-gl";
import { fitBoundsToGeoJson } from "./lib/fitBoundsToGeoJson";
import { getRouteSatelliteImageryUrl } from "./lib/nobushi/getRouteSatelliteImageryUrl";
import { explainSatelliteImagery } from "./lib/gemini/explainRouteImagery";

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
  const [routeGeoJson, setRouteGeoJson] = useState<turf.AllGeoJSON | null>(
    null
  );
  const mapRef = useRef<MapRef | null>(null);

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
    // 3行目が空行の場合は許容する
    const lines = result.split("\n").filter((line) => line.trim() !== "");
    if (lines.length !== 2) {
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
        setSystemMessage((prev) => [...prev, "散歩道の位置情報を取得完了。"]);
      }
    };
    doit();
  }, [departureString, destinationString]);

  useEffect(() => {
    const doit = async () => {
      if (departureLatLng && destinationLatLng) {
        setSystemMessage((prev) => [...prev, "散歩道の経路を探索中…"]);
        const valhallaResult = await getValhallaResponseJsonWithCache(
          {
            lon: departureLatLng[1],
            lat: departureLatLng[0],
          },
          {
            lon: destinationLatLng[1],
            lat: destinationLatLng[0],
          }
        );
        const polyline = decodePolyline(valhallaResult.trip.legs[0].shape);
        setSystemMessage((prev) => [
          ...prev,
          "散歩道の経路を探索完了。",
          "散歩道を表示中…",
        ]);
        const newGeoJson = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: polyline,
              },
            },
          ],
        } as turf.AllGeoJSON;
        setRouteGeoJson(newGeoJson);
        fitBoundsToGeoJson(mapRef, newGeoJson, {
          top: 100,
          bottom: 100,
          left: 100,
          right: 100,
        });
        setSystemMessage((prev) => [...prev, "散歩道の表示完了。"]);
      }
    };
    doit();
  }, [departureLatLng, destinationLatLng]);

  useEffect(() => {
    const doit = async () => {
      if (routeGeoJson) {
        setSystemMessage((prev) => [...prev, "散歩道の人工衛星画像を取得中…"]);
        const imageUrl = await getRouteSatelliteImageryUrl(routeGeoJson);
        console.log(imageUrl);
        // imageUrl を fetch して base64 に変換して explainSatelliteImagery に渡す
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        setSystemMessage((prev) => [...prev, "散歩道の人工衛星画像を解析中…"]);
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          let base64data = reader.result as string;
          base64data = base64data.replace(
            "data:application/octet-stream;",
            "data:image/png;"
          );
          console.log(base64data);
          const explain = await explainSatelliteImagery(value, base64data);
          console.log(explain);
        };
      }
    };
    doit();
  }, [routeGeoJson, value]);

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
          ref={mapRef}
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
          {routeGeoJson && (
            <>
              <Source id="route" type="geojson" data={routeGeoJson}>
                <Layer
                  {...{
                    id: "route",
                    type: "line",
                    paint: {
                      "line-color": "blue",
                      "line-width": 8,
                    },
                  }}
                />
              </Source>
            </>
          )}
        </Map>
      </div>
    </div>
  );
}

export default App;
