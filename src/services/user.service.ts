import * as RequestUtils from '../utils/request';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

export const UserService = {
  /**
   * Get all users
   * @returns The list of users if successful, an empty array otherwise
   */
  getAll: async (): Promise<User[]> => {
    const response = await RequestUtils.privateGet<User[]>(API_CONFIG.endpoints.user.getAll);
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  },
  /**
   * Get user by ID
   * @param id - User ID
   * @returns The user if found, null otherwise
   */
  getById: async (id: string): Promise<User | null> => {
    const response = await RequestUtils.privateGet<User>(API_CONFIG.endpoints.user.getById(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to fetch user");
  },
  /**
   * Create a new user
   * @param data - User information
   * @returns The created user if successful, null otherwise
   */
  create: async (data: Partial<User>): Promise<User | null> => {
    const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.user.create, data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to create user");
  },
  /**
   * Update user information
   * @param id - User ID
   * @param data - User information
   * @returns The updated user if successful, null otherwise
   */
  update: async (id: string, data: Partial<User>): Promise<User | null> => {
    const response = await RequestUtils.privatePut<User>(API_CONFIG.endpoints.user.update(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || "Failed to update user");
  },
  /**
   * Delete a user
   * @param id - User ID
   * @returns True if deletion is successful, false otherwise
   */
  delete: async (id: string): Promise<boolean> => {
    const response = await RequestUtils.privateDelete(API_CONFIG.endpoints.user.delete(id));
    return response.success;
  },
  /**
   * Search users
   * @param params - Search parameters
   * @returns The list of users matching the search criteria if successful, an empty array otherwise
   */
  search: async (params: any): Promise<User[]> => {
    const response = await RequestUtils.privateGet<User[]>(API_CONFIG.endpoints.user.search, { params });
    if (response.success && response.data) {
      return response.data;
    }
    return [];
  }

};

