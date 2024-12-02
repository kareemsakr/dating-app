import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn", isLoggedIn);
      const isOnMainApp = nextUrl.pathname.startsWith("/app");
      if (isOnMainApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnMainApp) {
        return Response.redirect(new URL("/app", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
