"use client";

import { useEventStatistics } from "@/features/events/hooks/useEventStatistics";
import { ErrorState, LoaderState } from "@/shared/components/UiStates";
import { toDate } from "@/shared/utils/format";

interface Props {
  id: string;
}

export function EventStatisticsView({ id }: Props) {
  const { data, isLoading, isError } = useEventStatistics(id);

  if (isLoading) return <LoaderState />;
  if (isError || !data) return <ErrorState message="No fue posible consultar las estadísticas." />;

  // 🌟 Mapeo exacto basado en el JSON de tu API .NET
  const eventName = data.eventName ?? "Evento";
  const totalCapacity = data.capacity ?? 0;
  const registeredSeats = data.totalRegistrations ?? 0;
  const availableSeats = data.availableSeats ?? 0;
  const occupancyPercentage = Math.round(data.occupancyPercentage ?? 0);

  // La lista real de usuarios viene dentro de 'registrations'
  const recentRegistrations = data.registrations ?? [];

  return (
    <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">Estadísticas: {eventName}</h1>
      
      {/* Tarjetas de Indicadores */}
      <div className="grid gap-3 md:grid-cols-4">
        <StatCard title="Capacidad" value={totalCapacity.toString()} />
        <StatCard title="Inscritos" value={registeredSeats.toString()} />
        <StatCard title="Disponibles" value={availableSeats.toString()} />
        <StatCard title="Ocupación" value={`${occupancyPercentage}%`} />
      </div>

      {/* Tabla de Asistentes Inscritos */}
      <div className="overflow-x-auto">
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
            {recentRegistrations.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500 italic">
                  No hay usuarios inscritos en este evento todavía.
                </td>
              </tr>
            ) : (
              recentRegistrations.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-2 font-medium text-gray-900">{row.userName}</td>
                  <td className="py-2 text-gray-600">{row.userEmail}</td>
                  <td className="py-2 text-gray-600">{toDate(row.registrationDate)}</td>
                  <td className="py-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.status === "Confirmed" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {row.status === "Confirmed" ? "Confirmado" : "Cancelado"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm">
      <p className="text-xs font-medium uppercase text-gray-500 tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </article>
  );
}