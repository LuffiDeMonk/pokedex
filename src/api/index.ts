import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_POKEMON_BASE_API_URL,
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
