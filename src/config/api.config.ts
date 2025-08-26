import { VITE_API_URL } from './env.config';

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
      getAll: '/users',
      getById: (id: string) => `/users/${id}`,
      create: '/users',
      update: (id: string) => `/users/${id}`,
      delete: (id: string) => `/users/${id}`,
      search: '/users/search'
    },
    tag: {
      getAll: '/tags',
      getById: (id: string) => `/tags/${id}`,
      create: '/tags',
      update: (id: string) => `/tags/${id}`,
      delete: (id: string) => `/tags/${id}`
    },
    course: {
      getAll: '/courses',
      getById: (id: string) => `/courses/${id}`,
      create: '/courses',
      update: (id: string) => `/courses/${id}`,
      delete: (id: string) => `/courses/${id}`,
      search: '/courses/search',
    }

  }
};