import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { redis } from "@/lib/redis";
import { generateShortUrl } from "@/server/utils/generateShortUrl";
import { storeUrl } from "@/server/utils/storeUrl";
import { TRPCError } from "@trpc/server";
import { urlInputSchema } from "@/schema/url-schema";

export const urlRouter = createTRPCRouter({
  shorten: publicProcedure.input(urlInputSchema).mutation(async ({ input }) => {
    const { url, customUrl } = input;

    // if custom short url is provided, check if it already exists
    if (customUrl) {
      const existingCustom = await redis.hget("short_urls", customUrl);
      if (existingCustom) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Custom URL already exists",
        });
      }

      //store custom short url in cache
      await storeUrl(url, customUrl, true);
      return customUrl;
    }

    // if url already exists, return existing short url
    const existingUrl = await redis.hget("urls", url);
    if (existingUrl) {
      return existingUrl;
    }

    //generate unique short url
    const shortUrl = await generateShortUrl();

    //store newly created shortUrl in cache
    await storeUrl(url, shortUrl, false);
    return shortUrl;
  }),
  getAll: publicProcedure.query(async () => {
    return await redis.hlen("short_urls");
  }),
});
