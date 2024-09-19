import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";

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
          placeholder: "ADMINNET",
          value: "ADMINNET",
        },
      },
      async authorize(credentials, req) {
        console.log("authorize(credentials)");

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
  callbacks: {
    jwt({ token, user }) {
      // console.log("jwt(params)");
      // console.log("Token", token);
      // console.log("User", user);
      // console.log("jwt(params) - End call");

      let domain: string;

      if (user) {
        domain = user.domain || "default";

        if (domain === "ADMINNET") {
          token.role = "admin";
          token.domain = domain;
        } else {
          token.role = "default";
          token.domain = domain;
        }
      }

      return token;
    },
    session({ session, token }) {
      // console.log("session(params)");
      // console.log("Token", token);
      // console.log("User", session);
      // console.log("session(params) - End call");

      session.user.role = token.role;
      session.user.domain = token.domain;

      return session;
    },
  },
};
