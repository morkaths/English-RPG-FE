import { VITE_API_URL } from './constants';

export const API_CONFIG = {
    baseURL: VITE_API_URL,
    timeout: 10000,
    endpoints: {
        auth: {
            login: '/auth/login',
            register: '/auth/register',
            logout: '/auth/logout',
            profile: '/auth/profile',
            update: '/auth/update-profile'
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