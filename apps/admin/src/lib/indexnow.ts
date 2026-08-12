import { SITE_URL } from "./site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitUrlsToIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn("INDEXNOW_KEY is not set; skipping IndexNow submission");
    return;
  }
  if (urls.length === 0) return;

  const host = new URL(SITE_URL).host;

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList: urls,
    }),
  });

  if (!res.ok) {
    throw new Error(`IndexNow submission failed: ${res.status} ${await res.text()}`);
  }
}
