import { redis } from "@/lib/redis";

export const generateShortUrl = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortUrl = "";

  while (true) {
    shortUrl = "";
    for (let i = 0; i < 6; i++) {
      shortUrl += characters[Math.floor(Math.random() * characters.length)];
    }

    const existingUrl = await redis.hget("short_urls", shortUrl);
    if (!existingUrl) {
      break;
    }
  }
  return shortUrl;
};
