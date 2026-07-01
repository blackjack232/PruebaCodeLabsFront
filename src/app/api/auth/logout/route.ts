import { NextResponse } from "next/server";

const clearCookieConfig = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 0,
};

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("ems_access_token", "", clearCookieConfig);
  response.cookies.set("ems_refresh_token", "", clearCookieConfig);
  response.cookies.set("ems_authenticated", "", clearCookieConfig);
  response.cookies.set("ems_role", "", clearCookieConfig);

  return response;
}
