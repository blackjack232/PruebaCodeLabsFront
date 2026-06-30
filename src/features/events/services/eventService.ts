import { mockEvents } from "@/features/events/data/mockEvents";
import { apiClient } from "@/shared/services/http/axios";
import { EventDetailDto, EventStatisticsDto, EventSummaryDto } from "@/shared/types/dto";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

const wait = async () => new Promise((resolve) => setTimeout(resolve, 250));

export const eventService = {
  async getEvents(search: string): Promise<EventSummaryDto[]> {
    if (!useMock) {
      const response = await apiClient.get<EventSummaryDto[]>("/events", { params: { search } });
      return response.data;
    }

    await wait();
    const normalizedSearch = search.trim().toLowerCase();

    return mockEvents.filter((event) => {
      if (!event.published) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return event.name.toLowerCase().includes(normalizedSearch);
    });
  },

  async getEventById(id: string): Promise<EventDetailDto> {
    if (!useMock) {
      const response = await apiClient.get<EventDetailDto>(`/events/${id}`);
      return response.data;
    }

    await wait();

    const event = mockEvents.find((candidate) => candidate.id === id);

    if (!event) {
      throw new Error("No se encontró el evento solicitado.");
    }

    return event;
  },

  async getAdminEvents(): Promise<EventSummaryDto[]> {
    if (!useMock) {
      const response = await apiClient.get<EventSummaryDto[]>("/admin/events");
      return response.data;
    }

    await wait();
    return mockEvents;
  },

  async getEventStatistics(id: string): Promise<EventStatisticsDto> {
    if (!useMock) {
      const response = await apiClient.get<EventStatisticsDto>(`/admin/events/${id}/statistics`);
      return response.data;
    }

    const event = await this.getEventById(id);

    return {
      eventId: event.id,
      eventName: event.name,
      capacity: event.capacity,
      registered: event.registered,
      available: event.capacity - event.registered,
      occupancy: Math.round((event.registered / event.capacity) * 100),
      recentRegistrations: [
        {
          id: "a-1",
          name: "Laura Gómez",
          email: "laura@example.com",
          createdAt: "2026-06-01T08:30:00.000Z",
          status: "Confirmed",
        },
        {
          id: "a-2",
          name: "Carlos Díaz",
          email: "carlos@example.com",
          createdAt: "2026-06-01T10:00:00.000Z",
          status: "Pending",
        },
      ],
    };
  },
};
