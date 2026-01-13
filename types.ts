
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  RECEPTIONIST = 'RECEPTIONIST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  username: string; // Adicionado para login orgânico
  email?: string;
  role: UserRole;
  cpf?: string;
  birthDate?: string;
  whatsapp?: string;
  specialty?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  description?: string;
}

export interface DoctorProfile {
  name: string;
  education: string[];
  photo: string;
  bgColor: string;
}
