"use client";

import { useState } from "react";
import { useEvents } from "@/features/events/hooks/useEvents";
import { EventCard } from "@/features/events/components/EventCard";
import { EmptyState, ErrorState, LoaderState } from "@/shared/components/UiStates";
import { SearchBar } from "@/shared/components/SearchBar";

export function EventsListView() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useEvents(search);

  return (
    <section className="space-y-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Buscar evento por nombre" />

      {isLoading ? <LoaderState /> : null}
      {isError ? <ErrorState message="No fue posible consultar los eventos." /> : null}

      {!isLoading && !isError && data?.length === 0 ? <EmptyState message="No existen eventos disponibles." /> : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
