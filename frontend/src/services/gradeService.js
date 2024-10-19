// services/gradeService.js
import axios from 'axios';

const API_URL = '/api/grades/';

const getGrades = async (classId) => {
  const response = await axios.get(API_URL, { params: { classId } });
  return response.data;
};

const createGrade = async (gradeData) => {
  const response = await axios.post(API_URL, gradeData);
  return response.data;
};

const updateGrade = async (id, gradeData) => {
  const response = await axios.put(`${API_URL}${id}`, gradeData);
  return response.data;
};

const gradeService = {
  getGrades,
  createGrade,
  updateGrade,
};

export default gradeService;
