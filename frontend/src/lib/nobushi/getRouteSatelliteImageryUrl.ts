import * as turf from "@turf/turf";

export const getRouteSatelliteImageryUrl = async (geojson: turf.AllGeoJSON) => {
  const apiEndpoint = "https://api.nobushi.yuiseki.net/geojson_png";
  const params = new URLSearchParams();
  params.append("geojson", JSON.stringify(geojson));
  return `${apiEndpoint}?${params.toString()}`;
};
