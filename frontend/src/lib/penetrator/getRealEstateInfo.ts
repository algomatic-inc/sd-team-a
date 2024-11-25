export const getRealEstateInfo = async (lat: number, lon: number) => {
  const apiEndpoint = "https://api.nobushi.yuiseki.net/real_estate_info";
  const params = new URLSearchParams();
  params.append("lat", lat.toString());
  params.append("lon", lon.toString());
  const myAbortController = new AbortController();
  const response = await fetch(`${apiEndpoint}?${params.toString()}`, {
    signal: myAbortController.signal,
  });
  setTimeout(() => {
    myAbortController.abort();
  }, 5000);
  return response.json();
};
