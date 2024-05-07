import NextAuth from "next-auth";
import { Ratelimit } from "@upstash/ratelimit";
import authConfig from "./auth.config";
import { kv } from "@vercel/kv";

import {
  DEFAULT_LOGIN_REDIRECTION,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
const { auth: middleware } = NextAuth(authConfig);

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(8, "10 s"),
});
export default middleware(async (req) => {
  const ip = req.ip ?? "127.0.0.1";
  const { nextUrl } = req;
  const { success, remaining } = await rateLimit.limit(ip);

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (!success && remaining === 0) {
    return Response.json({ message: "To many request" });
  }
  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECTION, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
