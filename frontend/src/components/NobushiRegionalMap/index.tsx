import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
  Position,
  GeoJsonProperties,
} from "geojson";
import { getRealEstateInfo } from "../../lib/penetrator/getRealEstateInfo";

export const NobushiRegionalMap: React.FC<{
  region: string;
  attributionPosition: ControlPosition;
}> = ({ region, attributionPosition }) => {
  const mapRef = useRef<MapRef | null>(null);

  const [landMask, setLandMask] = useState<
    FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | undefined
  >(undefined);

  const [geoJson, setGeoJson] = useState<
    FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties> | undefined
  >(undefined);

  // 人が住める12個のGPS座標
  const [peopleCanLiveCoordinates, setPeopleCanLiveCoordinates] = useState<
    Position[]
  >([]);

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

  // geoJsonのPolygon or MultiPolygonの内側のランダムなGPS座標を取得する
  // turfにはそんな機能ないので頑張る
  const getRandomGeoJsonCoordinate = useCallback(() => {
    if (!geoJson) {
      return;
    }
    const feature = geoJson.features[0];
    if (!feature) {
      return;
    }
    if (
      feature.geometry.type !== "Polygon" &&
      feature.geometry.type !== "MultiPolygon"
    ) {
      return;
    }
    const coordinates = feature.geometry.coordinates;
    if (!coordinates) {
      return;
    }
    // coordinatesはPolygonの場合はnumber[][][]、MultiPolygonの場合はnumber[][][][]
    if (feature.geometry.type === "Polygon") {
      // Polygonの場合、Polygonの内側のランダムな座標を取得する
      const polygon = turf.polygon(coordinates as number[][][]);
      const bbox = turf.bbox(polygon);
      const randomPoint = turf.randomPosition(bbox);
      return randomPoint;
    }
    if (feature.geometry.type === "MultiPolygon") {
      // MultiPolygonの場合、MultiPolygonの内側のランダムな座標を取得する
      const multiPolygon = turf.multiPolygon(coordinates as number[][][][]);
      const bbox = turf.bbox(multiPolygon);
      const randomPoint = turf.randomPosition(bbox);
      return randomPoint;
    }
  }, [geoJson]);

  // ランダムなGPS座標を繰り返し取得して、getRealEstateInfoを呼び出して、人が住めるかどうかを判定し、
  // 人が住める場合はpeopleCanLiveCoordinatesに追加する
  // peopleCanLiveCoordinatesが12個になるまで繰り返す
  useEffect(() => {
    const doit = async () => {
      if (!geoJson) {
        return;
      }
      if (peopleCanLiveCoordinates.length >= 12) {
        console.log(`peopleCanLiveCoordinates.length >= 10`);
        return;
      }
      const promises = [];
      for (let i = 0; i < 3; i++) {
        const coordinate = getRandomGeoJsonCoordinate();
        if (!coordinate) {
            continue
        }
        promises.push(
          getRealEstateInfo(coordinate[1], coordinate[0]).then((res) => {
            if (!res) {
              return;
            }
            console.log(`res:`, res);
            if (
              res["specificUseDistrict"] === "取得失敗" ||
              res["specificUseDistrict"] === "市街化区域外"
            ) {
              // 人が住めない
              return;
            }
            if (res["chibanAddress"] === "該当なし") {
              // 人が住めない
              return;
            }
            setPeopleCanLiveCoordinates((prev) => [...prev, coordinate]);
          })
        );
      }
      await Promise.all(promises);
    };
    doit();
  }, [geoJson, getRandomGeoJsonCoordinate, peopleCanLiveCoordinates.length]);

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
