// services/authService.js
import axios from 'axios';

const API_URL = '/api/auth/';

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
