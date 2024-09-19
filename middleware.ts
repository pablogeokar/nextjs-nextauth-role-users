import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log("middleware(req)");

    if (
      req.nextUrl.pathname === "/admin-only" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized(token) {
        // console.log("authorized(token)");
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin-only"] };
