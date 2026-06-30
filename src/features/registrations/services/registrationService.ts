import { mockRegistrations } from "@/features/registrations/data/mockRegistrations";
import { apiClient } from "@/shared/services/http/axios";
import { MyRegistrationDto, RegistrationRequestDto, RegistrationResponseDto } from "@/shared/types/dto";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const registrationService = {
  async createRegistration(payload: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    if (!useMock) {
      const response = await apiClient.post<RegistrationResponseDto>("/registrations", payload);
      return response.data;
    }

    return {
      id: `registration-${Date.now()}`,
      status: "Confirmed",
    };
  },

  async getMyRegistrations(): Promise<MyRegistrationDto[]> {
    if (!useMock) {
      const response = await apiClient.get<MyRegistrationDto[]>("/registrations/me");
      return response.data;
    }

    return mockRegistrations;
  },
};
