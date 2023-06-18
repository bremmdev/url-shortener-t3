import { redis } from "@/lib/redis";

export const storeUrl = async (
  url: string,
  shortUrl: string,
  isCustom = false
) => {
  await redis.hset("short_urls", { [shortUrl]: url });
  //we only want to store urls bidirectionally if they are not custom
  if (!isCustom) {
    await redis.hset("urls", { [url]: shortUrl });
  }
};
