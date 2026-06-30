"use client";

import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/features/events/services/eventService";

export const useEventStatistics = (id: string) =>
  useQuery({
    queryKey: ["event-statistics", id],
    queryFn: () => eventService.getEventStatistics(id),
  });
