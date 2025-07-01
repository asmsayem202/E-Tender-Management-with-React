import axios, { AxiosError, type AxiosResponse } from "axios";

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const api_instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api_instance.interceptors.request.use((config) => {
  const Token: string | null = localStorage.getItem("Etender-token");
  if (Token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${Token}`;
  }
  return config;
});

api_instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("Etender-token");
      window.localStorage.removeItem("Etender-user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
