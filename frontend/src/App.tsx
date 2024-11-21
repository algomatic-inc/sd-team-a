import Map, {
  AttributionControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useState } from "react";
import { AutoResizeTextarea } from "./components/AutoResizeTextarea";
import { NobushiSubmitButton } from "./components/NobushiSubmitButton";
import { extractDepartureAndDestination } from "./lib/gemini/extractDepartureAndDestination";

function App() {
  const [value, setValue] = useState("");

  const onSubmit = useCallback(async () => {
    if (value === "") {
      return;
    }
    console.log(value);
    const result = await extractDepartureAndDestination(value);
    console.log(result);
  }, [value]);

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
