import type { TokenResponse } from "../../types/auth/auth";
import { api } from "../api";

export async function login(
  username: string,
  password: string,
): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>("/api/token/", {
    username,
    password,
  });

  sessionStorage.setItem("access_token", response.data.access);
  sessionStorage.setItem("refresh_token", response.data.refresh);

  return response.data;
}

export function logout() {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
}
