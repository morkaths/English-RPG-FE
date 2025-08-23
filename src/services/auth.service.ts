import * as RequestUtils from '../utils/request';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

export const AuthService = {
    register: async(user: Partial<User>): Promise<User | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.register, user);
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },
    login: async(email: string, password: string): Promise<User | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.auth.login, { email, password });
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },
    logout: async(): Promise<boolean> => {
        const response = await RequestUtils.privatePost(API_CONFIG.endpoints.auth.logout);
        return response.success;
    },
    me: async(): Promise<User | null> => {
        const response = await RequestUtils.privateGet<User>(API_CONFIG.endpoints.auth.me);
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    }
}