"use client";

import { useQuery } from "@tanstack/react-query";
import { eventService } from "@/features/events/services/eventService";

export const useEvents = (search: string) =>
  useQuery({
    queryKey: ["events", search],
    queryFn: () => eventService.getEvents(search),
  });
