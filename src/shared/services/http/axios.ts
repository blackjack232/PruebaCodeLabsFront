import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { accessTokenStore } from "@/shared/services/http/accessTokenStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = accessTokenStore.get();

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  config.headers["Accept-Language"] = "es-CO";
  config.headers["X-Correlation-Id"] = crypto.randomUUID();

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      accessTokenStore.clear();
    }

    return Promise.reject(error);
  },
);

export { apiClient };
