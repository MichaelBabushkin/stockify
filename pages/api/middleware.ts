export { default } from "next-auth/middleware";

export const config = {
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    // allows a single file
    "/api/register.ts",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/function-bind/**",
  ],
  matcher: ["/profile"],
  // matcher: ["/((?!register|api|login).*)"],
};
