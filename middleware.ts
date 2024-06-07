import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECTION,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
import { currentUser } from "./lib/auth";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const user = await currentUser();
  const isSubscribed = user?.isSubscribed;
  const isPaymentPlan = user?.paymentPlan!!;

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(isSubscribed ? "/dashboard" : "/checkout", nextUrl)
      );
    }
    return;
  }
  const authRoute = `/auth/signup${nextUrl?.search}`;
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(
        nextUrl?.searchParams?.get("ref") ? authRoute : "/auth/login",
        nextUrl
      )
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
