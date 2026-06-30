"use client";

import { useQuery } from "@tanstack/react-query";
import { registrationService } from "@/features/registrations/services/registrationService";

export const useMyRegistrations = () =>
  useQuery({
    queryKey: ["my-registrations"],
    queryFn: () => registrationService.getMyRegistrations(),
  });
