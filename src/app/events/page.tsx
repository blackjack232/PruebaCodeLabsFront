import { EventsListView } from "@/features/events/components/EventsListView";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
      <EventsListView />
    </div>
  );
}
