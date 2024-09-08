import NextAuth from "next-auth";

import authConfig from "./auth.config";

import {
  DEFAULT_LOGIN_REDIRECTION,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
import { currentUser } from "./lib/auth";
import { signOut } from "./auth";
import { IsRestoringProvider } from "@tanstack/react-query";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const user = await currentUser();
  const isSubscribed = user?.isSubscribed;
  const role = user?.role;
  const isAdminOrModerator = role === ("ADMIN" || "MODERATOR");

  const { nextUrl } = req;

  const isLoggedIn = req.auth!!;
  // const isUserRoute = userRoute.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  const hasRefLink = nextUrl?.searchParams?.get("ref");
  const refURL = `/auth/signup${nextUrl?.search}`;

  if (!isLoggedIn && isPublicRoute) {
    // if has refLInk redirect
    if (hasRefLink) return Response.redirect(new URL(refURL, nextUrl));
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // If user is admin or moderator
      if (isAdminOrModerator) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      return Response.redirect(
        new URL(isSubscribed ? "/dashboard" : "/checkout", nextUrl)
      );
    }
    return;
  }

  // Check if session expires
  if (
    isLoggedIn &&
    (user?.customExpiration as number) < Math.floor(Date.now() / 1000)
  ) {
    if (nextUrl.pathname !== "/logout") {
      return Response.redirect(new URL("/logout", nextUrl));
    }
  }

  if (nextUrl.pathname === "/") {
    if (isSubscribed) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }

    if (user?.paymentPlan) {
      return Response.redirect(new URL("/checkout", nextUrl));
    }

    if (isAdminOrModerator) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
    }
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
