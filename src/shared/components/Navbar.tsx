import { cookies } from "next/headers";
import Link from "next/link";
import { LogoutButton } from "@/shared/components/LogoutButton";

export async function Navbar() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("ems_authenticated")?.value === "true";

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Event Management
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <Link href="/events">Eventos</Link>
          <Link href="/my-registrations">Mis inscripciones</Link>
          <Link href="/admin">Admin</Link>
          {isAuthenticated ? <LogoutButton /> : <Link href="/login">Login</Link>}
        </div>
      </nav>
    </header>
  );
}
