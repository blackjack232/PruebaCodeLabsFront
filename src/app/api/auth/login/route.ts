import { NextRequest, NextResponse } from "next/server";
import { LoginRequestDto, LoginResponseDto } from "@/shared/types/dto";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

const baseCookieConfig = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

interface BackendLoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  errors: string[];
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  };
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as LoginRequestDto;

  const upstream = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": request.headers.get("accept-language") ?? "es-CO",
      "X-Correlation-Id": request.headers.get("x-correlation-id") ?? crypto.randomUUID(),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const upstreamData = (await upstream.json()) as BackendLoginResponse;

  if (!upstream.ok || !upstreamData?.data?.accessToken) {
    return NextResponse.json(upstreamData, { status: upstream.status || 401 });
  }

  const role = upstreamData.data.user.role === "Admin" ? "Admin" : "User";
  const maxAge = Number.isFinite(upstreamData.data.expiresIn) ? upstreamData.data.expiresIn : 3600;

  const responsePayload: LoginResponseDto = {
    success: upstreamData.success,
    message: upstreamData.message,
    statusCode: upstreamData.statusCode,
    errors: upstreamData.errors,
    data: {
      expiresIn: upstreamData.data.expiresIn,
      user: upstreamData.data.user,
    },
  };

  const response = NextResponse.json(responsePayload, { status: upstream.status });

  response.cookies.set("ems_access_token", upstreamData.data.accessToken, {
    ...baseCookieConfig,
    maxAge,
  });

  response.cookies.set("ems_refresh_token", upstreamData.data.refreshToken, {
    ...baseCookieConfig,
    maxAge: 7 * 24 * 60 * 60,
  });

  response.cookies.set("ems_authenticated", "true", {
    ...baseCookieConfig,
    maxAge,
  });

  response.cookies.set("ems_role", role, {
    ...baseCookieConfig,
    maxAge,
  });

  return response;
}
