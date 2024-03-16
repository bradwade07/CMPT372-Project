import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionUserType } from "./app/auth";
import { UserTypes } from "./api/user.types";

// TODO: create middleware for checkout
export async function middleware(request: NextRequest) {
	const userType = await getSessionUserType();
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
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/become-vendor", "/product-listings", "/admin-dashboard"],
};
