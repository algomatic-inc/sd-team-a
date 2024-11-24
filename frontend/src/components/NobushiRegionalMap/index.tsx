import { useEffect, useRef, useState } from "react";
import Map, {
  AttributionControl,
  ControlPosition,
  Layer,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { getOverpassResponseJsonWithCache } from "../../lib/osm/getOverpass";
import { overpassQueriesForCapitals } from "../../lib/osm/overpassQueries/overpassQueriesForCapitals";
import osmtogeojson from "osmtogeojson";
import { fitBoundsToGeoJson } from "../../lib/maplibre/fitBoundsToGeoJson";

export const NobushiRegionalMap: React.FC<{
  region: string;
  attributionPosition: ControlPosition;
}> = ({ region, attributionPosition }) => {
  const mapRef = useRef<MapRef | null>(null);

  const [geoJson, setGeoJson] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

  useEffect(() => {
    const doit = async () => {
      if (region.length > 0) {
        const query = overpassQueriesForCapitals.find(
          (q) => q.region === region
        )?.query;
        if (!query) {
          console.error(`query not found for region: ${region}`);
          return;
        }
        const overpassRes = await getOverpassResponseJsonWithCache(query);
        if (!overpassRes) {
          console.error(`overpassRes is undefined for region: ${region}`);
          return;
        }
        const newGeoJson = osmtogeojson(overpassRes);
        setGeoJson(newGeoJson);
      }
    };
    doit();
  }, [region]);

  useEffect(() => {
    if (geoJson) {
      fitBoundsToGeoJson(mapRef, geoJson, {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      });
    }
  }, [geoJson]);

  return (
    <>
      <Map
        ref={mapRef}
        id="background"
        initialViewState={{
          latitude: 35.68385063,
          longitude: 139.75397279,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://unopengis.github.io/foil4g/stylejson/server.arcgisonline.com/world_imagery/style.json"
        attributionControl={false}
      >
        <AttributionControl position={attributionPosition} />
        {geoJson && (
          <>
            <Source
              key={`region-${region}-source`}
              id={`region-${region}`}
              type="geojson"
              data={geoJson}
            >
              <Layer
                {...{
                  id: `region-${region}-line`,
                  type: "line",
                  paint: {
                    "line-color": "blue",
                    "line-width": 2,
                  },
                }}
              />
              <Layer
                {...{
                  id: `region-${region}-fill`,
                  type: "fill",
                  paint: {
                    "fill-color": "blue",
                    "fill-opacity": 0.2,
                  },
                }}
              />
            </Source>
          </>
        )}
      </Map>
    </>
  );
};
