import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn", isLoggedIn);
      const isOnMainApp = nextUrl.pathname.startsWith("/app");

      if (nextUrl.pathname === "/") return true; // Always allow all requests to the landing page

      const authPages = ["/auth/login", "/auth/signup"];
      const isAuthPage = authPages.includes(nextUrl.pathname);

      if (isLoggedIn && isAuthPage) {
        const url = nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
      }

      if (isOnMainApp) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
