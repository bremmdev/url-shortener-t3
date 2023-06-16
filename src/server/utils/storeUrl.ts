import { redis } from "@/lib/redis";

export const storeUrl = async (url: string, shortUrl: string) => {
  await redis.hset("short_urls", { [shortUrl]: url });
  await redis.hset("urls", { [url]: shortUrl });
};
