export const getStaticStreetviewUrl = async (lat: number, lon: number) => {
  const apiEndpoint = "https://api.nobushi.yuiseki.net/streetview_png";
  const params = new URLSearchParams();
  params.append("lat", lat.toString());
  params.append("lon", lon.toString());
  return `${apiEndpoint}?${params.toString()}`;
};
