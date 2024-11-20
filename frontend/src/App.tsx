import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 3,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://unopengis.github.io/foil4g/stylejson/server.arcgisonline.com/world_imagery/style.json"
    />
  );
}

export default App;
