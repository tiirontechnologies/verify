
import type { AuthResponse } from "../types/auth.types";

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {

  if (email === "student@test.com" && password === "123456") {
    return {
      token: "student-token",
      role: "student",
    };
  }

  if (email === "organization@test.com" && password === "123456") {
    return {
      token: "organization-token",
      role: "organization",
    };
  }

  throw new Error("Invalid credentials");
}