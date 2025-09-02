import axios from 'axios';
import type { ApiResponse } from 'src/types';
import { API_CONFIG } from 'src/config/api.config';
import { getCookie, deleteCookie } from 'src/utils/cookie';

// ────────────────────────────────────────────────────────────────────────────────
// API Instances
// ────────────────────────────────────────────────────────────────────────────────
const apiInstances = Object.fromEntries(
  Object.entries(API_CONFIG.baseURLs).map(([service, baseURL]) => [
    service,
    {
      public: createApiInstance(baseURL, false),
      private: createApiInstance(baseURL, true),
    }
  ])
) as {
  [K in keyof typeof API_CONFIG.baseURLs]: {
    public: ReturnType<typeof createApiInstance>,
    private: ReturnType<typeof createApiInstance>
  }
};

export type ApiService = keyof typeof API_CONFIG.baseURLs;
type ApiMode = keyof (typeof apiInstances)[ApiService];

// ────────────────────────────────────────────────────────────────────────────────
// API Methods
// ────────────────────────────────────────────────────────────────────────────────

// Tạo instance axios
function createApiInstance(baseURL: string, withCredentials = false) {
  // Instance axios
  const instance = axios.create({
    baseURL,
    timeout: API_CONFIG.timeout,
    withCredentials
  });

  // Request interceptor (thêm token nếu cần)
  instance.interceptors.request.use(
    (config) => {
      if (withCredentials) {
        const token = getCookie('authToken');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor (xử lý lỗi 401 nếu cần)
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (withCredentials && error.response?.status === 401) {
        deleteCookie('authToken');
        deleteCookie('authUser');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Xử lý lỗi chung
function handleError(error: any): ApiResponse<any> {
  console.error('API Error:', error.response?.data?.message || 'Lỗi kết nối máy chủ!');
  return {
    success: false,
    message: error.response?.data?.message || 'Lỗi kết nối máy chủ!',
    statusCode: error.response?.status || 500
  };
}

// Lấy instance axios dựa trên service và mode
function getApiInstance(service: ApiService, mode: ApiMode) {
  return apiInstances[service][mode];
}

async function apiGet<T>(
  service: ApiService,
  url: string,
  params?: any,
  mode: ApiMode = 'private'
): Promise<ApiResponse<T>> {
  try {
    const api = getApiInstance(service, mode);
    const response = await api.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

async function apiPost<T>(
  service: ApiService,
  url: string,
  data?: any,
  mode: ApiMode = 'private'
): Promise<ApiResponse<T>> {
  try {
    const api = getApiInstance(service, mode);
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

async function apiPut<T>(
  service: ApiService,
  url: string,
  data?: any,
  mode: ApiMode = 'private'
): Promise<ApiResponse<T>> {
  try {
    const api = getApiInstance(service, mode);
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

async function apiDelete<T>(
  service: ApiService,
  url: string,
  mode: ApiMode = 'private'
): Promise<ApiResponse<T>> {
  try {
    const api = getApiInstance(service, mode);
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

export {
  apiGet,
  apiPost,
  apiPut,
  apiDelete
};
