export type UserRole = "inhaber" | "arzt" | "mfa" | "buero" | "azubi";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "arrived" | "in-progress" | "done" | "no-show";
  doctorId: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  insurance: "GKV" | "PKV" | "Selbstzahler";
  phone: string;
  email?: string;
  lastVisit?: string;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  href: string;
  roles: UserRole[];
  badge?: number;
}
