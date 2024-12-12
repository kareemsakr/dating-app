import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    is_admin: boolean;
    // add other custom properties here
  }

  interface Session {
    user: {
      is_admin: boolean;
      // other user properties
    } & DefaultSession["user"];
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    is_admin: boolean;
    // add other custom properties here
  }
}
