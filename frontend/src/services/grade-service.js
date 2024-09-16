// services/gradeService.js
import axios from 'axios';

const API_URL = '/api/grades/';

const addGrades = async (gradeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, gradeData, config);
  return response.data;
};

const getGrades = async (classId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + classId, config);
  return response.data;
};

const gradeService = {
  addGrades,
  getGrades,
};

export default gradeService;
