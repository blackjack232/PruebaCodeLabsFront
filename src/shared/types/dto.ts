export type UserRole = "User" | "Admin";

export interface EventSummaryDto {
  id: string;
  name: string;
  description: string;
  date: string;
  city: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  imageUrl: string;
  published: boolean;
}

export interface EventDetailDto extends EventSummaryDto {
  startTime: string;
  endTime: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  role: UserRole;
  name: string;
}

export interface RegistrationRequestDto {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  notes: string;
}

export interface RegistrationResponseDto {
  id: string;
  status: "Confirmed" | "Pending";
}

export interface MyRegistrationDto {
  id: string;
  eventName: string;
  eventDate: string;
  status: "Confirmed" | "Pending";
}

export interface EventStatisticsDto {
  eventId: string;
  eventName: string;
  capacity: number;
  registered: number;
  available: number;
  occupancy: number;
  recentRegistrations: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    status: "Confirmed" | "Pending";
  }>;
}
