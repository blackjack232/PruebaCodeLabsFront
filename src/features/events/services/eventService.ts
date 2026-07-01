import { mockEvents } from "@/features/events/data/mockEvents";
import { apiClient } from "@/shared/services/http/axios";
import { EventDetailDto, EventStatisticsDto, EventSummaryDto } from "@/shared/types/dto";

// 1. Definimos la interfaz que empaca las respuestas de tu .NET
interface OperationResult<T> {
  success: boolean;
  message: string;
  statusCode: number;
  errors: string[];
  data: T; // <-- Aquí viene el objeto o arreglo real
}

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

const wait = async () => new Promise((resolve) => setTimeout(resolve, 250));

export const eventService = {
  async getEvents(search: string): Promise<EventSummaryDto[]> {
    if (!useMock) {
      // Tipamos la respuesta para decirle a Axios que viene envuelta en un OperationResult
      const response = await apiClient.get<OperationResult<EventSummaryDto[]>>("/Events", { 
        params: { search } 
      });
      console.log("response.data", response.data);
      // Retornamos el .data interno de tu backend (.data.data)
      return response.data.data;
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

      return event.title.toLowerCase().includes(normalizedSearch);
    });
  },

  async getEventById(id: string): Promise<EventDetailDto> {
    if (!useMock) {
      const response = await apiClient.get<OperationResult<EventDetailDto>>(`/Events/${id}`);
      return response.data.data;
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
      // Ajustado a la ruta estándar de tu controlador si aplica, o cámbiala por la real de tu .NET
      const response = await apiClient.get<OperationResult<EventSummaryDto[]>>("/Events");
     
      return response.data.data;
    }

    await wait();
    return mockEvents;
  },

  async getEventStatistics(id: string): Promise<EventStatisticsDto> {
    if (!useMock) {
      // Ajustado para apuntar al endpoint que vimos en el controlador de .NET: {id}/statistics
      const response = await apiClient.get<OperationResult<EventStatisticsDto>>(`/Events/${id}/statistics`);
      return response.data.data;
    }

    const event = await this.getEventById(id);

    return {
      eventId: event.id,
      eventName: event.title,
      capacity: event.capacity,
      totalRegistrations: event.registered,
      availableSeats: event.capacity - event.registered,
      occupancyPercentage: Math.round((event.registered / event.capacity) * 100),
      registrations: [
        {
          id: "a-1",
          userName: "Laura Gómez",
          userEmail: "laura@example.com",
          registrationDate: "2026-06-01T08:30:00.000Z",
          status: "Confirmed",
        },
        {
          id: "a-2",
          userName: "Carlos Díaz",
          userEmail: "carlos@example.com",
          registrationDate: "2026-06-01T10:00:00.000Z",
          status: "Pending",
        },
      ],
    };
  },
};