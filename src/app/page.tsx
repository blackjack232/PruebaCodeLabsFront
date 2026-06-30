import Link from "next/link";
import { EventsListView } from "@/features/events/components/EventsListView";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-blue-700 px-6 py-10 text-white">
        <h1 className="text-3xl font-bold">Event Management System</h1>
        <p className="mt-2 max-w-2xl text-blue-100">Descubre eventos, regístrate y administra inscripciones desde un solo lugar.</p>
        <Link href="/events" className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-700">
          Ver todos los eventos
        </Link>
      </section>
      <EventsListView />
    </div>
  );
}
