import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      domain?: string;
    };
  }

  interface User {
    role: string | undefined;
    domain: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string | undefined;
    domain: string | undefined;
  }
}
