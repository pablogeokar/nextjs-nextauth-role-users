import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    role: string | undefined;
    domain: string | undefined;
  }
}
