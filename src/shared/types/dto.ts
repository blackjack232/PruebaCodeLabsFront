export type UserRole = "User" | "Admin";

export interface EventSummaryDto {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  city: string;
  location: string;
  categoryName: string;
  capacity: number;
  registered: number;
  availableSeats: number;
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

// export interface LoginResponseDto {
//   accessToken: string;
//   role: UserRole;
//   name: string;
// }
export interface LoginResponseDto {
  success: boolean;
  message: string;
  statusCode: number;
  errors: string[];
  data: {
    expiresIn: number;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  };
}

// export interface RegistrationRequestDto {
//   eventId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   company: string;
//   position: string;
//   notes: string;
// }
export interface RegistrationRequestDto {
  eventId: string;
   notes: string;
}

export interface RegistrationResponseDto {
  id: string;
  status: "Confirmed" | "Pending";
}

// export interface MyRegistrationDto {
//   id: string;
//   eventName: string;
//   registrationDate: string;
//   status: "Confirmed" | "Pending";
// }
export interface MyRegistrationDto {
  success: boolean;
  message: string;
  statusCode: number;
  errors: string[];
  data: {
    id: string;
    eventName: string;
    registrationDate: string;
    status: "Confirmed" | "Pending";
  }[]; 
}

export interface EventStatisticsDto {
  eventId: string;
  eventName: string;
  capacity: number;
  totalRegistrations: number;
  availableSeats: number;
  occupancyPercentage: number;
  registrations: Array<{
    id: string;
    userName: string;
    userEmail: string;
    registrationDate: string;
    status: "Confirmed" | "Pending";
  }>;
}
