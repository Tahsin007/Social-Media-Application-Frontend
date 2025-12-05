import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing token, queue the request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      // No refresh token, redirect to login
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      // Call refresh token endpoint
      const response = await axiosInstance.post(`/auth/refresh`, {
        refreshToken,
      });

      // The backend response seems to be nested under `response.data.data`
      // Let's safely access it.
      const responseData = response.data?.data;
      if (!responseData || !responseData.accessToken) {
        throw new Error("Invalid token refresh response");
      }
      const { accessToken, refreshToken: newRefreshToken } = responseData;

      // Store new tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // Update authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      // Process queued requests
      processQueue(null, accessToken);

      isRefreshing = false;

      // Retry original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh token failed, logout user
      processQueue(refreshError, null);
      isRefreshing = false;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';

      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;