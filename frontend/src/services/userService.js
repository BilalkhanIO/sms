import axiosWithAuth from '../utils/axiosWithAuth';

const API_URL = '/api/users';

const getUsers = async () => {
  try {
    const response = await axiosWithAuth.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const createUser = async (userData) => {
  try {
    const response = await axiosWithAuth.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const updateUser = async (userData) => {
  try {
    const response = await axiosWithAuth.put(`${API_URL}/${userData._id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const deleteUser = async (userId) => {
  try {
    await axiosWithAuth.delete(`${API_URL}/${userId}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
