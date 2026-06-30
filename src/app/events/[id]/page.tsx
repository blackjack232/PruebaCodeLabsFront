import { EventDetailView } from "@/features/events/components/EventDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  return <EventDetailView id={id} />;
}
