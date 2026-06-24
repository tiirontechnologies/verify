export type UserRole = "student" | "organization";

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: UserRole;
}