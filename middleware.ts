import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECTION,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECTION, nextUrl));
    }
    return;
  }
  const authRoute = `/auth/signup${nextUrl?.search}`;
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(nextUrl?.search ? authRoute : "/auth/login", nextUrl)
    );
  }
  // if (!isLoggedIn) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }
  return;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
