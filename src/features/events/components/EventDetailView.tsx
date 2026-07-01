"use client";

import Link from "next/link";
import { useEvent } from "@/features/events/hooks/useEvent";
import { EmptyState, ErrorState, LoaderState } from "@/shared/components/UiStates";
import { toDate } from "@/shared/utils/format";

interface Props {
  id: string;
  isAuthenticated: boolean;
}

export function EventDetailView({ id, isAuthenticated }: Props) {
  const { data, isLoading, isError } = useEvent(id);

  if (isLoading) return <LoaderState />;
  if (isError) return <ErrorState message="No fue posible consultar el evento." />;
  if (!data) return <EmptyState message="No se encontró el evento." />;

  const available = data.capacity - data.availableSeats;
  const canRegister = available > 0 && isAuthenticated;


  return (
    <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
      <p className="text-gray-700">{data.description}</p>
      <div className="grid gap-3 text-sm text-gray-700 md:grid-cols-2">
        <p>Fecha: {toDate(data.startDate)}</p>
        <p>Horario: {toDate(data.startDate)} - {toDate(data.endDate)}</p>
        <p>Lugar: {data.location}</p>
        <p>Categoría: {data.categoryName}</p>
        <p>
          Disponibles: {available} / {data.capacity}
        </p>
      </div>

      {isAuthenticated ? (
        <p className="text-sm text-emerald-700">Ya iniciaste sesión. Puedes completar tu registro.</p>
      ) : (
        <p className="text-sm text-amber-700">Debes iniciar sesión para completar el registro.</p>
      )}
      {available <= 0 ? <p className="text-sm text-red-700">Cupos agotados.</p> : null}

      <Link
        href={`/events/${data.id}/register`}
        aria-disabled={!canRegister}
        className={`inline-block rounded-md px-4 py-2 text-sm font-medium text-white ${canRegister ? "bg-blue-600 hover:bg-blue-700" : "pointer-events-none bg-gray-400"}`}
      >
        Inscribirse
      </Link>
    </section>
  );
}
