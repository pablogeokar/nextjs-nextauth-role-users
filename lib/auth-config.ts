import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
import { use } from "react";

export const auth: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "I.E. Jsmith",
        },
        password: { label: "Password", type: "password" },
        domain: {
          label: "Domain",
          type: "text",
          placeholder: "ADMINET",
          value: "ADMINET",
        },
      },
      async authorize(credentials, req) {
        const user: User = {
          id: "1",
          name: "Pablo George",
          email: "pablogeokar@gmail.com",
          domain: credentials?.domain,
          role: "default",
        };

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
};
