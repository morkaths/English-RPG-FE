import axios from 'axios';
import { API_CONFIG } from 'src/config/api.config';
import { getCookie, deleteCookie } from 'src/utils/cookie';

// ────────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────────
// Instance axios
const publicApi = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout
});
// Response interceptor (xử lý lỗi)
publicApi.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

// ────────────────────────────────────────────────────────────────────────────────
// Private API
// ────────────────────────────────────────────────────────────────────────────────
// Instance axios
const privateApi = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    withCredentials: true
});
// Request interceptor (tự động thêm token)
privateApi.interceptors.request.use(
    (config) => {
        const token = getCookie('authToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Response interceptor (xử lý token hết hạn)
privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token hết hạn, redirect về login
            deleteCookie('authToken');
            deleteCookie('authUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { publicApi, privateApi };
