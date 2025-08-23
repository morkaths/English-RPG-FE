import * as RequestUtils from '../utils/request';
import type { User } from '../types';
import { API_CONFIG } from 'src/config/api.config';

export const UserService = {
    getAll: async (): Promise<User[]> => {
        const response = await RequestUtils.privateGet<User[]>(API_CONFIG.endpoints.user.getAll);
        if (response.success && response.data) {
            return response.data;
        }
        return [];
    },
    getById: async (id: string): Promise<User | null> => {
        const response = await RequestUtils.privateGet<User>(API_CONFIG.endpoints.user.getById(id));
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },
    create: async (user: Partial<User>): Promise<User | null> => {
        const response = await RequestUtils.privatePost<User>(API_CONFIG.endpoints.user.create, user);
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },
    update: async (id: string, user: Partial<User>): Promise<User | null> => {
        const response = await RequestUtils.privatePut<User>(API_CONFIG.endpoints.user.update(id), user);
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    },
    delete: async (id: string): Promise<boolean> => {
        const response = await RequestUtils.privateDelete(API_CONFIG.endpoints.user.delete(id));
        return response.success;
    }
};

// import { publicApi, privateApi } from './index';
// import type { User, ApiResponse } from '../types';
// import { API_CONFIG } from 'src/config/api.config';

// export const AuthService = {
//     login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
//         try {
//             const response = await publicApi.post<ApiResponse<User>>(API_CONFIG.endpoints.auth.login, { email, password });
//             if (response.data?.success && response.data.user && response.data.token) {
//                 return { user: response.data.user, token: response.data.token };
//             }
//             return null;
//         } catch (error: any) {
//             throw new Error(error?.response?.data?.message || 'Login failed!');
//         }
//     },
// };

