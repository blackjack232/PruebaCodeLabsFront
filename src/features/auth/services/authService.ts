import { apiClient } from "@/shared/services/http/axios";
import { LoginRequestDto, LoginResponseDto } from "@/shared/types/dto";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const authService = {
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    if (!useMock) {
      const response = await apiClient.post<LoginResponseDto>("/auth/login", payload);
      return response.data;
    }

    if (payload.password !== "123456") {
      throw new Error("Credenciales inválidas.");
    }

    const isAdmin = payload.email.toLowerCase().startsWith("admin");

    return {
      accessToken: `mock-token-${Date.now()}`,
      role: isAdmin ? "Admin" : "User",
      name: isAdmin ? "Administrador" : "Usuario",
    };
  },
};
