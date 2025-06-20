import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const tenantId = request.nextUrl.pathname.split("/")[1];

  // You can add tenant validation logic here
  // For example, check if the tenant exists in your database

  // If invalid tenant, redirect to 404 or home page
  // if (!isValidTenant(tenantId)) {
  //   return NextResponse.redirect(new URL('/404', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/:tenantId/:path*",
};
