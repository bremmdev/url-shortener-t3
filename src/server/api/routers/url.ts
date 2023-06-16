import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { redis } from "@/lib/redis";
import { generateShortUrl } from "@/server/utils/generateShortUrl";
import { storeUrl } from "@/server/utils/storeUrl";

export const urlRouter = createTRPCRouter({
  shorten: publicProcedure
    .input(z.string().max(2048).url({ message: "Invalid url" }))
    .mutation(async ({ input }) => {
      const url = input;

      // if url already exists, return existing short url
      const existingUrl = await redis.hget("urls", url);
      if (existingUrl) {
        return existingUrl;
      }

      //generate unique short url
      const shortUrl = await generateShortUrl();

      //store newly created shortUrl in cache
      await storeUrl(url, shortUrl);
      return shortUrl;
    }),
});
