// services/examService.js
import axios from 'axios';

const API_URL = '/api/exams/';

const getExams = async (classId) => {
  const response = await axios.get(API_URL, { params: { classId } });
  return response.data;
};

const createExam = async (examData) => {
  const response = await axios.post(API_URL, examData);
  return response.data;
};

const examService = {
  getExams,
  createExam,
};

export default examService;

