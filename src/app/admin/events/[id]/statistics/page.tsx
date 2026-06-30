import { EventStatisticsView } from "@/features/statistics/components/EventStatisticsView";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventStatisticsPage({ params }: Props) {
  const { id } = await params;

  return <EventStatisticsView id={id} />;
}
