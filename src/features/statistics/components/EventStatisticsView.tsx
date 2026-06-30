"use client";

import { useEventStatistics } from "@/features/events/hooks/useEventStatistics";
import { ErrorState, LoaderState } from "@/shared/components/UiStates";
import { toDate } from "@/shared/utils/format";

export function EventStatisticsView({ id }: { id: string }) {
  const { data, isLoading, isError } = useEventStatistics(id);

  if (isLoading) return <LoaderState />;
  if (isError || !data) return <ErrorState message="No fue posible consultar las estadísticas." />;

  return (
    <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">Estadísticas: {data.eventName}</h1>
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard title="Capacidad" value={data.capacity.toString()} />
        <StatCard title="Inscritos" value={data.registered.toString()} />
        <StatCard title="Disponibles" value={data.available.toString()} />
        <StatCard title="Ocupación" value={`${data.occupancy}%`} />
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-700">
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
            <th className="py-2">Fecha de registro</th>
            <th className="py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.recentRegistrations.map((row) => (
            <tr key={row.id} className="border-b border-gray-100">
              <td className="py-2">{row.name}</td>
              <td className="py-2">{row.email}</td>
              <td className="py-2">{toDate(row.createdAt)}</td>
              <td className="py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-md border border-gray-200 bg-gray-50 p-3">
      <p className="text-xs uppercase text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </article>
  );
}
