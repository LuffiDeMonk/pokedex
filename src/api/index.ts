import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const http = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiClient.request<T, T>(config);
};

