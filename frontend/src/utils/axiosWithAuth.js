// src/utils/axiosWithAuth.js
import axios from 'axios';
import store from '../redux/store';
import { refreshToken } from '../redux/slices/authSlice';

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshToken());
        return axiosWithAuth(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosWithAuth;