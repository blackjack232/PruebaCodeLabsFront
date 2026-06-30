"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/features/events/services/eventService";
import { ErrorState, LoaderState } from "@/shared/components/UiStates";
import { toDate } from "@/shared/utils/format";

export default function AdminEventsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-events"],
    queryFn: () => eventService.getAdminEvents(),
  });

  if (isLoading) return <LoaderState />;
  if (isError) return <ErrorState message="No fue posible consultar los eventos." />;

  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">Eventos (Admin)</h1>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-700">
            <th className="py-2">Nombre</th>
            <th className="py-2">Fecha</th>
            <th className="py-2">Capacidad</th>
            <th className="py-2">Inscritos</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((event) => (
            <tr key={event.id} className="border-b border-gray-100">
              <td className="py-2">{event.name}</td>
              <td className="py-2">{toDate(event.date)}</td>
              <td className="py-2">{event.capacity}</td>
              <td className="py-2">{event.registered}</td>
              <td className="py-2">
                <Link href={`/admin/events/${event.id}`} className="text-blue-700 hover:underline">
                  Ver
                </Link>
                <span className="mx-2 text-gray-300">|</span>
                <Link href={`/admin/events/${event.id}/statistics`} className="text-blue-700 hover:underline">
                  Estadísticas
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
