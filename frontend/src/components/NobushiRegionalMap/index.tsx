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
import { overpassQueriesForRegions } from "../../lib/osm/overpassQueries/overpassQueriesForRegions";
import osmtogeojson from "osmtogeojson";
import * as turf from "@turf/turf";
import { fitBoundsToGeoJson } from "../../lib/maplibre/fitBoundsToGeoJson";

export const NobushiRegionalMap: React.FC<{
  region: string;
  attributionPosition: ControlPosition;
}> = ({ region, attributionPosition }) => {
  const mapRef = useRef<MapRef | null>(null);

  const [geoJson, setGeoJson] = useState<
    | GeoJSON.FeatureCollection<
        GeoJSON.Polygon | GeoJSON.MultiPolygon,
        GeoJSON.GeoJsonProperties
      >
    | undefined
  >(undefined);

  const [landMask, setLandMask] = useState<
    | GeoJSON.FeatureCollection<
        GeoJSON.Polygon | GeoJSON.MultiPolygon,
        GeoJSON.GeoJsonProperties
      >
    | undefined
  >(undefined);

  useEffect(() => {
    // 日本列島マスクデータのロード
    const loadLandMask = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"
      );
      const data = await response.json();
      // 日本の都道府県だけを抽出
      const japanLand = {
        type: "FeatureCollection",
        features: data.features.filter(
          (feature: GeoJSON.Feature) =>
            feature.properties?.admin === "Japan" &&
            (feature.geometry.type === "Polygon" ||
              feature.geometry.type === "MultiPolygon")
        ),
      } as GeoJSON.FeatureCollection<
        GeoJSON.Polygon | GeoJSON.MultiPolygon,
        GeoJSON.GeoJsonProperties
      >;
      console.log(japanLand);
      setLandMask(japanLand);
    };
    loadLandMask();
  }, []);

  useEffect(() => {
    const doit = async () => {
      if (region.length > 0) {
        const query = overpassQueriesForRegions.find(
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
        const newOsmGeoJson = osmtogeojson(overpassRes);
        const newGeoJson = turf.featureCollection(
          newOsmGeoJson.features
            .filter((feature) => {
              return (
                feature.geometry?.type === "Polygon" ||
                feature.geometry?.type === "MultiPolygon"
              );
            })
            .filter((feature) => !!feature.properties)
        ) as GeoJSON.FeatureCollection<
          GeoJSON.Polygon | GeoJSON.MultiPolygon,
          GeoJSON.GeoJsonProperties
        >;

        // 海領域を除外する処理
        if (landMask && newGeoJson) {
          // landMaskとnewGeoJsonの交差部分を取得
          // turf.intersect()はFeatureCollection同士の交差判定を行う
          const clipped = turf.intersect(landMask, newGeoJson);
          const clippedFeatureCollection = {
            type: "FeatureCollection",
            features: clipped
              ? Array.isArray(clipped)
                ? clipped
                : [clipped]
              : [],
          } as GeoJSON.FeatureCollection<
            GeoJSON.Polygon | GeoJSON.MultiPolygon,
            GeoJSON.GeoJsonProperties
          >;
          setGeoJson(clippedFeatureCollection);
        } else {
          setGeoJson(newGeoJson);
        }
      }
    };
    doit();
  }, [region, landMask]);

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
