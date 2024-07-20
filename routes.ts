/**
 * An array of routes that are acceptable to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoute = [
  "/api/signup",
  "/api/webhook",
  "/api/pusherAuth",
  // "/block",
];

/**
 * An array of routes that are use for authentication
 * These routes will redirect loggedin use to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/new-verification",
];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECTION = "/checkout";
