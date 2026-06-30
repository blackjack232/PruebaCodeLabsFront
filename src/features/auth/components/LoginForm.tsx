"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "@/features/auth/services/authService";
import { accessTokenStore } from "@/shared/services/http/accessTokenStore";

const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio.").email("El correo no es válido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError("");

    try {
      const response = await authService.login(values);
      accessTokenStore.set(response.accessToken);
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: response.role }),
      });
      router.push(response.role === "Admin" ? "/admin" : "/events");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Login</h1>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Correo
        </label>
        <input id="email" type="email" {...register("email")} className="w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input id="password" type="password" {...register("password")} className="w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password.message}</p> : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70">
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
      <p className="text-xs text-gray-500">Demo: usa cualquier correo y contraseña 123456. Usa admin@demo.com para rol Admin.</p>
    </form>
  );
}
