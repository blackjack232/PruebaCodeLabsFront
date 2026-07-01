import { LoginRequestDto, LoginResponseDto } from "@/shared/types/dto";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const authService = {
  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    if (!useMock) {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as LoginResponseDto;

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas.");
      }

      return data;
    }

    // --- SECCIÓN MOCK ---
    if (payload.password !== "123456") {
      throw new Error("Credenciales inválidas.");
    }

    const isAdmin = payload.email.toLowerCase().startsWith("admin");

    // ✅ El Mock ahora también simula el objeto completo estructurado
    return {
      success: true,
      message: "Operación completada con éxito (Mock).",
      statusCode: 200,
      errors: [],
      data: {
        expiresIn: 3600,
        user: {
          id: "0a12fd66-mock-id-b07a-886e6eb41d09",
          firstName: isAdmin ? "Juan" : "Usuario",
          lastName: isAdmin ? "Pérez" : "Demo",
          email: payload.email,
          role: isAdmin ? "Admin" : "User",
        },
      },
    };
  },
};