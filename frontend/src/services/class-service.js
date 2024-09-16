// services/classService.js
import axios from 'axios';

const API_URL = '/api/classes/';

const getClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createClass = async (classData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, classData, config);
  return response.data;
};

const classService = {
  getClasses,
  createClass,
};

export default classService;
