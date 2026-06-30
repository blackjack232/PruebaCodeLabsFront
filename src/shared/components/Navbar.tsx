"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const roleFromCookie = () => {
  if (typeof document === "undefined") return "";
  const roleCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("ems_role="));

  return roleCookie?.split("=")[1] ?? "";
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = roleFromCookie();

  const onLogout = () => {
    fetch("/api/session", { method: "DELETE" }).finally(() => {
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Event Management
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/events" className={pathname.startsWith("/events") ? "text-blue-700" : "text-gray-700"}>
            Eventos
          </Link>
          <Link href="/my-registrations" className={pathname === "/my-registrations" ? "text-blue-700" : "text-gray-700"}>
            Mis inscripciones
          </Link>
          <Link href="/admin" className={pathname.startsWith("/admin") ? "text-blue-700" : "text-gray-700"}>
            Admin
          </Link>
          {role ? (
            <button type="button" onClick={onLogout} className="rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200">
              Salir
            </button>
          ) : (
            <Link href="/login" className={pathname === "/login" ? "text-blue-700" : "text-gray-700"}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
