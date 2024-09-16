// services/userService.js
import axios from 'axios';

const API_URL = '/api/users/';

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, userData, config);
  return response.data;
};

const userService = {
  getUsers,
  createUser,
};

export default userService;
