"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const onLogout = () => {
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <button 
      type="button" 
      onClick={onLogout} 
      className="rounded-md bg-gray-100 px-3 py-1 text-gray-700 hover:bg-gray-200 transition-colors"
    >
      Salir
    </button>
  );
}