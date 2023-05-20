export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function isLatitude(lat: number) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

export function isLongitude(lng: number) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}
