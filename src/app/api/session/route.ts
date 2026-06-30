import { NextRequest, NextResponse } from "next/server";

const cookieConfig = {
  path: "/",
  maxAge: 3600,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { role?: string };

  const response = NextResponse.json({ ok: true });

  response.cookies.set("ems_authenticated", "true", cookieConfig);
  response.cookies.set("ems_role", body.role === "Admin" ? "Admin" : "User", cookieConfig);

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("ems_authenticated", "", {
    ...cookieConfig,
    maxAge: 0,
  });

  response.cookies.set("ems_role", "", {
    ...cookieConfig,
    maxAge: 0,
  });

  return response;
}
