import * as RequestUtils from '../utils/request';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

export const AuthService = {
    register: async (data: Partial<User>): Promise<{ user: User; token: string } | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.register, data);
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Registration failed');
    },
    login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.login, { email, password });
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Login failed');
    },
    logout: async (): Promise<boolean> => {
        const response = await RequestUtils.privatePost(API_CONFIG.endpoints.auth.logout);
        return response.success;
    },
    profile: async (): Promise<User | null> => {
        const response = await RequestUtils.privateGet<User>(API_CONFIG.endpoints.auth.profile);
        if (response.success && response.user) {
            return response.user; 
        }
        throw new Error(response.message || 'Failed to fetch user profile');
    },
    update: async (data: Partial<User>): Promise<User | null> => {
        const response = await RequestUtils.privatePut<User>(API_CONFIG.endpoints.auth.update, data);
        if (response.success && response.user) {
            return response.user;
        }
        throw new Error(response.message || 'Failed to update user profile');
    }
}