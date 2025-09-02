import * as ApiRequest from './index';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

const SERVICE: ApiRequest.ApiService = 'user';

export const AuthService = {
    /**
     * Đăng ký người dùng mới
     * @param data - thông tin người dùng
     * @returns Promise<{ user: User; token: string } | null>
     */
    register: async (data: Partial<User>): Promise<{ user: User; token: string } | null> => {
        const response = await ApiRequest.apiPost<User>(SERVICE, API_CONFIG.endpoints.auth.register, data, 'public');
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Registration failed');
    },
    /**
     * Đăng nhập người dùng
     * @param email - địa chỉ email của người dùng
     * @param password - mật khẩu của người dùng
     * @returns Promise<{ user: User; token: string } | null>
     */
    login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
        const response = await ApiRequest.apiPost<User>(SERVICE, API_CONFIG.endpoints.auth.login, { email, password }, 'public');
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Login failed');
    },
    /**
     * Đăng xuất người dùng
     * @returns Promise<boolean>
     */
    logout: async (): Promise<boolean> => {
        const response = await ApiRequest.apiPost(SERVICE, API_CONFIG.endpoints.auth.logout);
        return response.success;
    },
    /**
     * Lấy thông tin người dùng
     * @returns Promise<User | null>
     */
    profile: async (): Promise<User | null> => {
        const response = await ApiRequest.apiGet<User>(SERVICE, API_CONFIG.endpoints.auth.profile);
        if (response.success && response.user) {
            return response.user; 
        }
        throw new Error(response.message || 'Failed to fetch user profile');
    },
    /**
     * Cập nhật thông tin người dùng
     * @param data - thông tin người dùng
     * @returns Promise<User | null>
     */
    update: async (data: Partial<User>): Promise<User | null> => {
        const response = await ApiRequest.apiPut<User>(SERVICE, API_CONFIG.endpoints.auth.update, data);
        if (response.success && response.user) {
            return response.user;
        }
        throw new Error(response.message || 'Failed to update user profile');
    }
}