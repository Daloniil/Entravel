import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface ApiConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

const ApiFactory = (config: ApiConfig): AxiosInstance => {
  const api: AxiosInstance = axios.create(config);

  api.interceptors.request.use(
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

  api.interceptors.response.use(
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

  return api;
};

export default ApiFactory;
