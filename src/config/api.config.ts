import { VITE_API_URL } from '../utils/constants';

export const API_CONFIG = {
    baseURL: VITE_API_URL,
    timeout: 10000,
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
            me: '/auth/me'
        },
        user: {
            getAll: '/user',
            getById: (id: string) => `/user/${id}`,
            create: '/user',
            update: (id: string) => `/user/${id}`,
            delete: (id: string) => `/user/${id}`
        },

    }
};