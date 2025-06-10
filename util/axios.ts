import { baseUrl } from '@/constants/keys';
import axios from 'axios';
import auth from './auth';

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = await auth.accessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await auth.refreshToken();

            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
                        refreshToken,
                    });
                    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                    await auth.updateTokens(accessToken, newRefreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    auth.logout();
                    return Promise.reject(refreshError);
                }
            } else {
                auth.logout();
            }
        }
        return Promise.reject(error);
    }
);

export const queryFn = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
};

export const mutationFn = async (
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: Record<string, any>,
    headers?: Record<string, any>
) => {
    const response = await apiClient.request({
        url: endpoint,
        method,
        data: body,
        headers: {
            ...headers,
        },
    });
    return response.data;
};
