import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const shortUrl = request.url.split("/go/")[1] || "";

  const existingUrl = await redis.hget("short_urls", shortUrl) as string;
  if (existingUrl) {
    return NextResponse.redirect(existingUrl);
  }

  return NextResponse.redirect(new URL('/404', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/go/:path*",
};
