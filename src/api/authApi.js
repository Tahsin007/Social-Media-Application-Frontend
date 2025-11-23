// src/api/authApi.js
import axiosInstance from './axios';

export const authApi = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - User's password
   * @returns {Promise} Response with user data and tokens
   */
  register: async (userData) => {
    const response = await axiosInstance.post('/api/auth/register', userData);
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password
   * @returns {Promise} Response with user data and tokens
   */
  login: async (credentials) => {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout current user
   * @returns {Promise} Response confirming logout
   */
  logout: async () => {
    const response = await axiosInstance.post('/api/auth/logout');
    return response.data;
  },

  /**
   * Get current authenticated user
   * @returns {Promise} Response with current user data
   */
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise} Response with new tokens
   */
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/api/auth/refresh', { refreshToken });
    return response.data;
  },
};

export default authApi;