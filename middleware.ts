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
  // console.log("USER", user);
  const isSubscribed = user?.isSubscribed;
  const role = user?.role;
  const isAdminOrModerator = role === ("ADMIN" || "MODERATOR");
  // console.log({ isAdminOrModerator });
  // const isPaymentPlan = user?.paymentPlan!!;

  const { nextUrl } = req;
  const isLoggedIn = req.auth!!;
  // const isUserRoute = userRoute.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoute.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isPublicRoute) return;

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

  if (
    user &&
    (user?.customExpiration as number) < Math.floor(Date.now() / 1000)
  ) {
    if (nextUrl.pathname !== "/logout") {
      return Response.redirect(new URL("/logout", nextUrl));
    }
  }

  if (nextUrl.pathname == "/" && isSubscribed) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  if (nextUrl.pathname == "/" && isAdminOrModerator) {
    return Response.redirect(new URL("/admin/dashboard", nextUrl));
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

  return;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
