// services/classService.js
import axios from 'axios';

const API_URL = '/api/classes';

const getClasses = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

const getClassDetails = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

const createClass = async (classData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    console.log('Sending class data:', JSON.stringify(classData, null, 2));
    const response = await axios.post(API_URL, classData, config);
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in createClass:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw new Error('Authentication failed. Please log in again.');
  }
  throw error;
};

const addStudent = async (data) => {
  const response = await axios.post(`${API_URL}/add-student`, data, getConfig());
  return response.data;
};

const removeStudent = async (data) => {
  const response = await axios.post(`${API_URL}/remove-student`, data, getConfig());
  return response.data;
};

const addSubject = async (data) => {
  const response = await axios.post(`${API_URL}/add-subject`, data, getConfig());
  return response.data;
};

const removeSubject = async (data) => {
  const response = await axios.post(`${API_URL}/remove-subject`, data, getConfig());
  return response.data;
};

const classService = {
  getClasses,
  getClassDetails,
  createClass,
  addStudent,
  removeStudent,
  addSubject,
  removeSubject,
};

export default classService;
