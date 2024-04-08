import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, getSessionUserType } from "./app/auth";
import { UserTypes } from "./api/user.types";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const userType = await getSessionUserType();

  // checking the user type on user specific URLs
  if (request.nextUrl.pathname.startsWith("/become-vendor")) {
    if (!(userType == UserTypes.Customer)) {
      console.log("Cannot become vendor if not a customer");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (request.nextUrl.pathname.startsWith("/product-listings")) {
    if (!(userType == UserTypes.Vendor)) {
      console.log("Cannot view product listings as a non-vendor");
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
    if (!(userType == UserTypes.Admin)) {
      console.log("Cannot view admin dashboard as a non-admin");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // user can't be logged in when they go to the sign in page
  if (request.nextUrl.pathname.startsWith("/signin")) {
    if (session) {
      console.log("Cannot go to sign in page when already logged in");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // user must be logged in to checkout and pay
  if (request.nextUrl.pathname.startsWith("/checkout")) {
    if (!session) {
      console.log("Cannot go to checkout without being logged in");
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/become-vendor",
    "/product-listings",
    "/admin-dashboard",
    "/checkout",
    "/checkout/:path*",
  ],
};
