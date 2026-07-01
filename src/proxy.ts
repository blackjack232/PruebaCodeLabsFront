import { NextRequest, NextResponse } from "next/server";

const adminRoutes = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get("ems_authenticated")?.value === "true";
  const role = request.cookies.get("ems_role")?.value;

  const isRegistrationRoute = pathname.match(/^\/events\/[^/]+\/register$/);
  const isProtectedRoute = pathname.startsWith("/my-registrations") || Boolean(isRegistrationRoute);

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (adminRoutes.some((route) => pathname.startsWith(route)) && (!isAuthenticated || role !== "Admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-registrations/:path*", "/admin/:path*", "/events/:path*/register"],
};
