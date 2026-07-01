import { cookies } from "next/headers";
import { EventDetailView } from "@/features/events/components/EventDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("ems_authenticated")?.value === "true";

  return <EventDetailView id={id} isAuthenticated={isAuthenticated} />;
}
