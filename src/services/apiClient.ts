import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

const ApiClientFactory = (config: ApiClientConfig): AxiosInstance => {
  const apiClient: AxiosInstance = axios.create(config);

  apiClient.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      console.log("API Request:", {
        method: request.method,
        url: request.url,
        headers: request.headers,
        data: request.data,
        params: request.params,
      });
      return request;
    },
    (error: AxiosError) => {
      console.error("API Request Error:", error.message, error.config);
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        console.error("API Response Error:", {
          status: error.response.status,
          url: error.config?.url,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        console.error("API No Response Error:", {
          request: error.request,
          message: error.message,
          config: error.config,
        });
      } else {
        console.error("API Error:", {
          message: error.message,
          config: error.config,
        });
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default ApiClientFactory;
