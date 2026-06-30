"use client";

import { useState } from "react";
import { useMyRegistrations } from "@/features/registrations/hooks/useMyRegistrations";
import { EmptyState, ErrorState, LoaderState } from "@/shared/components/UiStates";
import { SearchBar } from "@/shared/components/SearchBar";
import { toDate } from "@/shared/utils/format";

export function MyRegistrationsView() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useMyRegistrations();

  if (isLoading) return <LoaderState />;
  if (isError) return <ErrorState message="No fue posible consultar tus inscripciones." />;

  const rows =
    data?.filter((item) => item.eventName.toLowerCase().includes(search.trim().toLowerCase())) ?? [];

  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-gray-900">Mis inscripciones</h1>
      <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre del evento" />

      {rows.length === 0 ? (
        <EmptyState message="No existen registros." />
      ) : (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-700">
              <th className="py-2">Evento</th>
              <th className="py-2">Fecha</th>
              <th className="py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100">
                <td className="py-2">{row.eventName}</td>
                <td className="py-2">{toDate(row.eventDate)}</td>
                <td className="py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
