import * as ApiRequest from './index';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

const SERVICE: ApiRequest.ApiService = 'user';

export const UserService = {
  /**
   * Lấy tất cả người dùng
   * @returns Promise<User[]>
   */
  getAll: async (): Promise<User[]> => {
    const response = await ApiRequest.apiGet<User[]>(SERVICE, API_CONFIG.endpoints.user.getAll);
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  /**
   * Lấy người dùng theo ID
   * @param id - id của người dùng
   * @returns Promise<User | null>
   */
  getById: async (id: string): Promise<User | null> => {
    const response = await ApiRequest.apiGet<User>(SERVICE, API_CONFIG.endpoints.user.getById(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch user");
  },
  /**
   * Tạo người dùng mới
   * @param data - thông tin người dùng
   * @returns Promise<User | null>
   */
  create: async (data: Partial<User>): Promise<User | null> => {
    const response = await ApiRequest.apiPost<User>(SERVICE, API_CONFIG.endpoints.user.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create user");
  },
  /**
   * Cập nhật thông tin người dùng
   * @param id - id của người dùng
   * @param data - thông tin người dùng
   * @returns Promise<User | null>
   */
  update: async (id: string, data: Partial<User>): Promise<User | null> => {
    const response = await ApiRequest.apiPut<User>(SERVICE, API_CONFIG.endpoints.user.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update user");
  },
  /**
   * Xoá người dùng
   * @param id - id của người dùng
   * @returns Promise<boolean>
   */
  delete: async (id: string): Promise<boolean> => {
    const response = await ApiRequest.apiDelete(SERVICE, API_CONFIG.endpoints.user.delete(id));
    return response.success;
  },
  /**
   * Tìm kiếm người dùng
   * @param params - tham số tìm kiếm
   * @returns Promise<User[]>
   */
  search: async (params: any): Promise<User[]> => {
    const response = await ApiRequest.apiGet<User[]>(SERVICE, API_CONFIG.endpoints.user.search, { params }, 'public');
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  }

};

