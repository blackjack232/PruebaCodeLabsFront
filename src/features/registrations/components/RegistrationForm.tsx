"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registrationService } from "@/features/registrations/services/registrationService";

const registrationSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio."),
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Ingresa un correo válido."),
  phone: z.string().min(1, "El teléfono es obligatorio."),
  company: z.string().min(1, "La empresa es obligatoria."),
  position: z.string().min(1, "El cargo es obligatorio."),
  notes: z.string().max(500, "Máximo 500 caracteres.").optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function RegistrationForm({ eventId }: { eventId: string }) {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const mutation = useMutation({
    mutationFn: registrationService.createRegistration,
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setMessage("");

    // const response = await mutation.mutateAsync({
    //   ...values,
    //   notes: values.notes ?? "",
    //   eventId,
    // });
    const response = await mutation.mutateAsync({
      eventId,
      notes: values.notes ?? "",
    });

    setMessage(`Registro realizado correctamente. Estado: ${response.status}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-gray-900">Formulario de inscripción</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["firstName", "Nombre"],
          ["lastName", "Apellido"],
          ["email", "Correo"],
          ["phone", "Teléfono"],
          ["company", "Empresa"],
          ["position", "Cargo"],
        ].map(([field, label]) => (
          <div key={field}>
            <label htmlFor={field} className="mb-1 block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={field}
              {...register(field as keyof RegistrationFormValues)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors[field as keyof RegistrationFormValues] ? (
              <p className="mt-1 text-xs text-red-600">{errors[field as keyof RegistrationFormValues]?.message as string}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <textarea id="notes" {...register("notes")} className="h-24 w-full rounded-md border border-gray-300 px-3 py-2" />
        {errors.notes ? <p className="mt-1 text-xs text-red-600">{errors.notes.message}</p> : null}
      </div>

      {mutation.error ? <p className="text-sm text-red-600">No se pudo completar el registro.</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70"
      >
        {isSubmitting || mutation.isPending ? "Enviando..." : "Registrarme"}
      </button>
    </form>
  );
}
