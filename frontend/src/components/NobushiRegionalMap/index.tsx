import { useEffect, useRef, useState } from "react";
import Map, {
  AttributionControl,
  ControlPosition,
  Layer,
  MapRef,
  Marker,
  Source,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { getOverpassResponseJsonWithCache } from "../../lib/osm/getOverpass";
import { overpassQueriesForRegions } from "../../lib/osm/overpassQueries/overpassQueriesForRegions";
import osmtogeojson from "osmtogeojson";
import * as turf from "@turf/turf";
import { fitBoundsToGeoJson } from "../../lib/maplibre/fitBoundsToGeoJson";
import {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
  Position,
  GeoJsonProperties,
} from "geojson";
import { exampleRealEstates } from "../../lib/penetrator/exampleRealEstates";
import { exampleStations } from "../../lib/penetrator/exampleStations";
import { getValhallaResponseJsonWithCache } from "../../lib/osm/getValhalla";
import { decodePolyline } from "../../lib/osm/decodePolyline";
import { NobushiUserProfile } from "../../types/NobushiUserProfile";

export const NobushiRegionalMap: React.FC<{
  region: string;
  profile: NobushiUserProfile;
  attributionPosition: ControlPosition;
}> = ({ region, profile, attributionPosition }) => {
  const mapRef = useRef<MapRef | null>(null);

  const [landMask, setLandMask] = useState<
    FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | undefined
  >(undefined);

  const [regionGeoJson, setRegionGeoJson] = useState<
    FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | undefined
  >(undefined);

  /*
  const [requiredTime, setRequiredTime] = useState<number | undefined>(
    undefined
  );
  */

  const [routeGeoJson, setRouteGeoJson] = useState<turf.AllGeoJSON>();

  // サンプルの不動産のGPS座標 (出発地)
  const exampleRealEstateForRegion = exampleRealEstates
    .filter((i) => i.region === region)
    .slice(0, 1)[0];

  // サンプルの駅のGPS座標 (目的地)
  const exampleStationForRegion = exampleStations
    .filter((i) => i.region === region)
    .slice(0, 1)[0];

  useEffect(() => {
    // 日本列島マスクデータのロード
    const loadLandMask = async () => {
      if (landMask) {
        return;
      }
      const response = await fetch(
        "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"
      );
      const data = await response.json();
      // 日本の都道府県かつregionに合致する都道府県だけを抽出
      const japanLand = {
        type: "FeatureCollection",
        features: data.features
          .filter(
            (feature: Feature) =>
              feature.properties?.admin === "Japan" &&
              region.includes(feature.properties["name_ja"])
          )
          .filter(
            (feature: Feature) =>
              feature.geometry.type === "Polygon" ||
              feature.geometry.type === "MultiPolygon"
          ),
      } as FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties>;
      setLandMask(japanLand);
    };
    loadLandMask();
  }, [landMask, region]);

  useEffect(() => {
    const doit = async () => {
      if (region.length > 0 && landMask) {
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
        const overpassResGeoJson = osmtogeojson(overpassRes);
        const newGeoJson = {
          type: "FeatureCollection",
          features: overpassResGeoJson.features.filter(
            (feature: Feature) =>
              feature.geometry.type === "Polygon" ||
              feature.geometry.type === "MultiPolygon"
          ),
        } as FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties>;
        if (newGeoJson.features === undefined) {
          console.error(`newGeoJson.features is undefined`);
          return;
        }

        // 海領域を除外する処理
        if (landMask && newGeoJson) {
          // newGeoJson.features[0]が、Polygon or MultiPolygonを判定する
          const poly1 =
            newGeoJson.features[0].geometry.type === "Polygon"
              ? turf.polygon(
                  newGeoJson.features[0].geometry.coordinates as number[][][]
                )
              : turf.multiPolygon(
                  newGeoJson.features[0].geometry.coordinates as Position[][][]
                );
          // landMask.featuresが、Polygon or MultiPolygonを判定する
          const poly2 =
            landMask.features[0].geometry.type === "Polygon"
              ? turf.polygon(
                  landMask.features[0].geometry.coordinates as number[][][]
                )
              : turf.multiPolygon(
                  landMask.features[0].geometry.coordinates as Position[][][]
                );
          const clipped = turf.intersect(
            // @ts-expect-error poly1とpoly2はPolygon | MultiPolygonである
            turf.featureCollection([poly1, poly2])
          );
          if (!clipped) {
            console.error(`clipped is undefined`);
            return;
          }
          const clippedFeatureCollection = {
            type: "FeatureCollection",
            features: [clipped],
          } as FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties>;
          setRegionGeoJson(clippedFeatureCollection);
        } else {
          setRegionGeoJson(newGeoJson);
        }
      }
    };
    doit();
  }, [region, landMask]);

  useEffect(() => {
    if (regionGeoJson) {
      fitBoundsToGeoJson(mapRef, regionGeoJson, {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      });
    }
  }, [regionGeoJson]);

  useEffect(() => {
    const doit = async () => {
      if (exampleRealEstateForRegion && exampleStationForRegion) {
        const valhallaResult = await getValhallaResponseJsonWithCache(
          {
            lat: exampleRealEstateForRegion["lat"],
            lon: exampleRealEstateForRegion["lon"],
          },
          {
            lat: exampleStationForRegion["lat"],
            lon: exampleStationForRegion["lon"],
          }
        );
        //const time = valhallaResult.trip.summary.time;
        //setRequiredTime(time);
        const polyline = decodePolyline(valhallaResult.trip.legs[0].shape);
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
          right: 300,
        });
      }
    };
    setTimeout(() => {
      if (regionGeoJson) {
        doit();
      }
    }, 5000);
  }, [exampleRealEstateForRegion, exampleStationForRegion, regionGeoJson]);

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
        {regionGeoJson && (
          <>
            <Marker
              longitude={exampleStationForRegion["lon"]}
              latitude={exampleStationForRegion["lat"]}
              anchor="center"
            >
              <img
                width={40}
                height={21}
                src="https://i.gyazo.com/0ba6e9fe78a7835c09125aaad71b1921.png"
              />
            </Marker>
            <Marker
              longitude={exampleRealEstateForRegion["lon"]}
              latitude={exampleRealEstateForRegion["lat"]}
              anchor="center"
            >
              <img
                width={30}
                height={28}
                src="https://i.gyazo.com/8daf9d4f135ca9c27a1635032b3ff3a1.png"
              />
            </Marker>
          </>
        )}
        {routeGeoJson && (
          <>
            <Source
              key={`route-${region}-source`}
              id={`route-${region}`}
              type="geojson"
              data={routeGeoJson}
            >
              <Layer
                {...{
                  id: `route-${region}-line`,
                  type: "line",
                  paint: {
                    "line-color": "red",
                    "line-width": 2,
                  },
                }}
              />
            </Source>
          </>
        )}
        {regionGeoJson && (
          <>
            <Source
              key={`region-${region}-source`}
              id={`region-${region}`}
              type="geojson"
              data={regionGeoJson}
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
                    "fill-opacity": 0.1,
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
