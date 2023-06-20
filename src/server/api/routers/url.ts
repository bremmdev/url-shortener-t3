import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { redis } from "@/lib/redis";
import { generateShortUrl } from "@/server/utils/generateShortUrl";
import { storeUrl } from "@/server/utils/storeUrl";
import { TRPCError } from "@trpc/server";
import { urlInputSchema } from "@/schema/url-schema";

export const urlRouter = createTRPCRouter({
  shorten: publicProcedure.input(urlInputSchema).mutation(async ({ input }) => {
    const { url, customUrl } = input;

    /* CUSTOM URL FLOW */
    if (customUrl) {
      const existingCustom = await redis.hget("short_urls", customUrl);
      if (existingCustom) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Custom URL already exists",
        });
      }

      //store custom short url in cache
      try {
        await storeUrl(url, customUrl, true);
        return customUrl;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error storing custom URL",
        });
      }
    }

    /* NON-CUSTOM URL FLOW */
    // if url already exists, return existing short url from cache
    try {
      const existingUrl = await redis.hget("urls", url);
      if (existingUrl) {
        return existingUrl;
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error connecting to database",
      });
    }

    //generate unique short url
    const shortUrl = await generateShortUrl();

    //store newly created shortUrl in cache
    try {
      await storeUrl(url, shortUrl, false);
      return shortUrl;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error storing URL",
      });
    }
  }),
  getAll: publicProcedure.query(async () => {
    try {
      return await redis.hlen("short_urls");
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error connecting to database",
      });
    }
  }),
});
