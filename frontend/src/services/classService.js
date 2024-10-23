import axiosWithAuth from '../utils/axiosWithAuth';

const API_URL = '/api/classes/';

const getClasses = async () => {
  try {
    const response = await axiosWithAuth.get(API_URL);
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      console.warn('API returned an object instead of an array:', response.data);
      return Object.values(response.data);
    } else {
      console.error('API did not return valid data for classes:', response.data);
      throw new Error('Invalid data received from server');
    }
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

const deleteClass = async (id) => {
  const response = await axiosWithAuth.delete(API_URL + id);
  return response.data;
};

const createClass = async (classData) => {
  const response = await axiosWithAuth.post(API_URL, classData);
  return response.data;
};

const updateClass = async (classData) => {
  const response = await axiosWithAuth.put(API_URL + classData._id, classData);
  return response.data;
};

const classService = {
  getClasses,
  deleteClass,
  createClass,
  updateClass,
};

export default classService;
