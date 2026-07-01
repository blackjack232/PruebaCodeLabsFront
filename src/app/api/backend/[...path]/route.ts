import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";
const REFRESH_ENDPOINTS = ["/auth/refresh", "/auth/refresh-token"] as const;

const cookieBaseConfig = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

interface RefreshResponse {
  success: boolean;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  };
}

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("ems_access_token", "", { ...cookieBaseConfig, maxAge: 0 });
  response.cookies.set("ems_refresh_token", "", { ...cookieBaseConfig, maxAge: 0 });
  response.cookies.set("ems_authenticated", "", { ...cookieBaseConfig, maxAge: 0 });
  response.cookies.set("ems_role", "", { ...cookieBaseConfig, maxAge: 0 });
}

async function tryRefreshToken(refreshToken: string, request: NextRequest, correlationId: string) {
  for (const endpoint of REFRESH_ENDPOINTS) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": request.headers.get("accept-language") ?? "es-CO",
        "X-Correlation-Id": correlationId,
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      continue;
    }

    const data = (await response.json()) as RefreshResponse;
    const newAccessToken = data?.data?.accessToken;

    if (!newAccessToken) {
      continue;
    }

    return {
      accessToken: newAccessToken,
      refreshToken: data.data?.refreshToken ?? refreshToken,
      expiresIn: Number.isFinite(data.data?.expiresIn) ? Number(data.data?.expiresIn) : 3600,
    };
  }

  return null;
}

async function sendUpstreamRequest(target: URL, method: string, headers: Headers, bodyText: string | undefined) {
  return fetch(target.toString(), {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : bodyText,
    cache: "no-store",
  });
}

async function forward(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const target = new URL(`${API_BASE_URL}/${path.join("/")}`);
  target.search = request.nextUrl.search;

  const headers = new Headers();
  const correlationId = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  headers.set("Accept-Language", request.headers.get("accept-language") ?? "es-CO");
  headers.set("X-Correlation-Id", correlationId);

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  const accessToken = request.cookies.get("ems_access_token")?.value;
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const method = request.method.toUpperCase();
  const bodyText = method !== "GET" && method !== "HEAD" ? await request.text() : undefined;

  let upstream = await sendUpstreamRequest(target, method, headers, bodyText);

  if (upstream.status === 401) {
    const refreshToken = request.cookies.get("ems_refresh_token")?.value;

    if (refreshToken) {
      const refreshed = await tryRefreshToken(refreshToken, request, correlationId);

      if (refreshed) {
        headers.set("Authorization", `Bearer ${refreshed.accessToken}`);
        upstream = await sendUpstreamRequest(target, method, headers, bodyText);

        if (upstream.status !== 401) {
          const responseHeaders = new Headers();
          const upstreamContentType = upstream.headers.get("content-type");
          if (upstreamContentType) {
            responseHeaders.set("content-type", upstreamContentType);
          }

          const response = new NextResponse(upstream.body, {
            status: upstream.status,
            headers: responseHeaders,
          });

          response.cookies.set("ems_access_token", refreshed.accessToken, {
            ...cookieBaseConfig,
            maxAge: refreshed.expiresIn,
          });

          response.cookies.set("ems_refresh_token", refreshed.refreshToken, {
            ...cookieBaseConfig,
            maxAge: 7 * 24 * 60 * 60,
          });

          response.cookies.set("ems_authenticated", "true", {
            ...cookieBaseConfig,
            maxAge: refreshed.expiresIn,
          });

          return response;
        }
      }
    }
  }

  const responseHeaders = new Headers();
  const upstreamContentType = upstream.headers.get("content-type");
  if (upstreamContentType) {
    responseHeaders.set("content-type", upstreamContentType);
  }

  const response = new NextResponse(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });

  if (upstream.status === 401) {
    clearAuthCookies(response);
  }

  return response;
}

export function GET(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}

export function POST(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}

export function PUT(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}

export function PATCH(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}

export function DELETE(request: NextRequest, context: RouteContext) {
  return forward(request, context);
}
