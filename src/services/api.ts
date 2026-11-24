import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// instancia para renovar o token
const authApi = axios.create({
  baseURL: API_URL,
});

let refreshPromise: Promise<string> | null = null;
//adiciona access token

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// trata expiracao de access token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/api/token/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = sessionStorage.getItem("refresh_token");

    if (!refreshToken) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");

      if (typeof window !== "undefined") {
        window.location.assign("/login");
      }

      return Promise.reject(error);
    }

    try {
      // Evita renovacoes simultaneas
      if (!refreshPromise) {
        refreshPromise = authApi
          .post("/api/token/refresh/", {
            refresh: refreshToken,
          })
          .then((response) => {
            const newAccessToken = response.data.access;

            sessionStorage.setItem("access_token", newAccessToken);

            // Com ROTATE_REFRESH_TOKENS=True, pode vir um novo refresh
            if (response.data.refresh) {
              sessionStorage.setItem("refresh_token", response.data.refresh);
            }

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Repete a requisição que havia falhado
      return api(originalRequest);
    } catch (refreshError) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");

      if (typeof window !== "undefined") {
        window.location.assign("/login");
      }

      return Promise.reject(refreshError);
    }
  },
);

export default api;
