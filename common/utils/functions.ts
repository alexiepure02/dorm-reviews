import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

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

export function reformatQuery(query: string) {
  return query
    .trim()
    .replaceAll("s", "[sș]")
    .replaceAll("t", "[tț]")
    .replaceAll("a", "[aăâ]")
    .replaceAll("i", "[iî]")
    .replace(/\s+/g, " ");
}

export function checkAndSetImageSource(
  imagePath: string,
  fallbackPath: string
): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      // Image exists, use the original path
      resolve(imagePath);
    };
    image.onerror = () => {
      // Image doesn't exist, use the fallback path
      resolve(fallbackPath);
    };
    image.src = imagePath;
  });
}

export function getImageIndexFromUrl(url: string) {
  const index = url.split(".com/")[1].split("?")[0].split("-")[1];
  return index;
}

export function getNextImageIndex(
  response: PromiseResult<S3.ListObjectsV2Output, AWSError>
) {
  return +response.Contents!.slice(-1)[0].Key!.split("-")[1] + 1;
}
