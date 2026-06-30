import Link from "next/link";
import { EventSummaryDto } from "@/shared/types/dto";
import { toDate } from "@/shared/utils/format";

export function EventCard({ event }: { event: EventSummaryDto }) {
  const available = event.capacity - event.registered;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
      <p className="mt-2 text-sm text-gray-600">{event.description}</p>
      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p>Fecha: {toDate(event.date)}</p>
        <p>Ciudad: {event.city}</p>
        <p>
          Cupos: {available} / {event.capacity}
        </p>
      </div>
      <Link href={`/events/${event.id}`} className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        Ver detalle
      </Link>
    </article>
  );
}
