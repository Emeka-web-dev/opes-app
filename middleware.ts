import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECTION,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
  userRoute,
} from "./routes";
import { currentUser } from "./lib/auth";
import { signOut } from "./auth";
import { IsRestoringProvider } from "@tanstack/react-query";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const user = await currentUser();
  const isSubscribed = user?.isSubscribed;
  const isPaymentPlan = user?.paymentPlan!!;

  const { nextUrl } = req;
  const isLoggedIn = req.auth!!;
  const isUserRoute = userRoute.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isPublicRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(isSubscribed ? "/dashboard" : "/checkout", nextUrl)
      );
    }
    return;
  }
  if (nextUrl.pathname == "/" && isSubscribed) {
    return Response.redirect(new URL("/dashboard", nextUrl));
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
  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (!isSubscribed && isUserRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
