import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { role?: string };

  const response = NextResponse.json({ ok: true });

  response.cookies.set("ems_authenticated", "true", {
    path: "/",
    maxAge: 3600,
    httpOnly: false,
    sameSite: "lax",
  });

  response.cookies.set("ems_role", body.role === "Admin" ? "Admin" : "User", {
    path: "/",
    maxAge: 3600,
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("ems_authenticated", "", {
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("ems_role", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
