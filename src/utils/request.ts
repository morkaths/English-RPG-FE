import { publicApi, privateApi } from '../services/index';
import type { ApiResponse } from 'src/types';

/**
 * Hàm xử lý lỗi chung
 * @param error Nhận đối tượng lỗi từ API
 * @returns success, message, statusCode
 */
function handleError(error: any): ApiResponse<any> {
  console.error('API Error:', error.response?.data?.message || 'Lỗi kết nối máy chủ!');
  return {
    success: false,
    message: error.response?.data?.message || 'Lỗi kết nối máy chủ!',
    statusCode: error.response?.status || 500
  };
}

/**
 * Hàm gọi API GET công khai
 * @param url Đường dẫn API
 * @param params Tham số truy vấn
 * @returns ApiResponse
 */
export async function publicGet<T>(url: string, params?: any): Promise<ApiResponse<T>> {
  try {
    const response = await publicApi.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API POST công khai
 * @param url Đường dẫn API
 * @param data Dữ liệu gửi lên
 * @returns ApiResponse
 */
export async function publicPost<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const response = await publicApi.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API PUT công khai
 * @param url Đường dẫn API
 * @param data Dữ liệu gửi lên
 * @returns ApiResponse
 */
export async function publicPut<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const response = await publicApi.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API DELETE công khai
 * @param url Đường dẫn API
 * @returns ApiResponse
 */
export async function publicDelete<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await publicApi.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API GET riêng tư
 * @param url Đường dẫn API
 * @param params Tham số truy vấn
 * @returns ApiResponse
 */
export async function privateGet<T>(url: string, params?: any): Promise<ApiResponse<T>> {
  try {
    const response = await privateApi.get<ApiResponse<T>>(url, { params });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API POST riêng tư
 * @param url Đường dẫn API
 * @param data Dữ liệu gửi lên
 * @returns ApiResponse
 */
export async function privatePost<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const response = await privateApi.post<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API PUT riêng tư
 * @param url Đường dẫn API
 * @param data Dữ liệu gửi lên
 * @returns ApiResponse
 */
export async function privatePut<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const response = await privateApi.put<ApiResponse<T>>(url, data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

/**
 * Hàm gọi API DELETE riêng tư
 * @param url Đường dẫn API
 * @returns ApiResponse
 */
export async function privateDelete<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await privateApi.delete<ApiResponse<T>>(url);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}