import * as RequestUtils from '../utils/request';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

export const AuthService = {
    /**
     * New user registration
     * @param data - User information
     * @returns The user and token if registration is successful, null otherwise
     */
    register: async (data: Partial<User>): Promise<{ user: User; token: string } | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.register, data);
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Registration failed');
    },
    /**
     * User login
     * @param email - User email address
     * @param password - User password
     * @returns The user and token if login is successful, null otherwise
     */
    login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.login, { email, password });
        if (response.success && response.user && response.token) {
            return { user: response.user, token: response.token };
        }
        throw new Error(response.message || 'Login failed');
    },
    /**
     * User logout
     * @returns True if logout is successful, false otherwise
     */
    logout: async (): Promise<boolean> => {
        const response = await RequestUtils.privatePost(API_CONFIG.endpoints.auth.logout);
        return response.success;
    },
    /**
     * Get user profile
     * @returns The user profile if successful, null otherwise
     */
    profile: async (): Promise<User | null> => {
        const response = await RequestUtils.privateGet<User>(API_CONFIG.endpoints.auth.profile);
        if (response.success && response.user) {
            return response.user; 
        }
        throw new Error(response.message || 'Failed to fetch user profile');
    },
    /**
     * Update user information
     * @param data - User information
     * @returns The updated user if successful, null otherwise
     */
    update: async (data: Partial<User>): Promise<User | null> => {
        const response = await RequestUtils.privatePut<User>(API_CONFIG.endpoints.auth.update, data);
        if (response.success && response.user) {
            return response.user;
        }
        throw new Error(response.message || 'Failed to update user profile');
    }
}