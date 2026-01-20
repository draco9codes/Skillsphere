import axios, { AxiosError, type AxiosRequestConfig } from "axios";
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8083/api";
console.log("Backend URL:", BACKEND_URL);

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/**
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

/**
 * Generic HTTP wrapper
 */
export const http = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return api.get<T>(url, config).then((res) => res.data);
  },

  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return api.post<T>(url, data, config).then((res) => res.data);
  },

  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return api.put<T>(url, data, config).then((res) => res.data);
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return api.delete<T>(url, config).then((res) => res.data);
  },
};
