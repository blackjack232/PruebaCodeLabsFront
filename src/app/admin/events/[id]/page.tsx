import Link from "next/link";
import { eventService } from "@/features/events/services/eventService";
import { toDate } from "@/shared/utils/format";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await eventService.getEventById(id);

  return (
    <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
      <p className="text-gray-700">{event.description}</p>
      <ul className="space-y-1 text-sm text-gray-700">
        <li>Fecha: {toDate(event.startDate)}</li>
        <li>Lugar: {event.location}</li>
        <li>Capacidad: {event.capacity}</li>
        <li>Inscritos: {event.capacity - event.availableSeats}</li>
      </ul>
      <div className="flex gap-3">
        <button type="button" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Editar
        </button>
        <button type="button" className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
          Eliminar
        </button>
        <Link href={`/admin/events/${event.id}/statistics`} className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Ver estadísticas
        </Link>
      </div>
    </section>
  );
}
