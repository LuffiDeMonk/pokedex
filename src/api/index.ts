import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { logger } from '@/utils/logger';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_POKEMON_BASE_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    logger.info(`Starting Request: ${config.method?.toUpperCase()} ${config.url}`, {
      url: config.url,
      method: config.method,
      params: config.params,
    });
    return config;
  },
  (error) => {
    logger.error('Request Error', { error });
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    logger.info(`Response Received: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
    });
    return response.data;
  },
  (error) => {
    logger.error(error instanceof Error ? error : new Error(String(error)), {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export const http = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiClient.request<T, T>(config);
};
