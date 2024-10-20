// services/classService.js
import axios from 'axios';

const API_URL = '/api/classes/';

const getClasses = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getClassDetails = async (classId) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${API_URL}/${classId}`, config);
  return response.data;
};

const addStudent = async (classId, studentId) => {
  const response = await axios.post(API_URL + 'add-student', { classId, studentId });
  return response.data;
};

const removeStudent = async (classId, studentId) => {
  const response = await axios.post(API_URL + 'remove-student', { classId, studentId });
  return response.data;
};

const addSubject = async (classId, subject) => {
  const response = await axios.post(API_URL + 'add-subject', { classId, subject });
  return response.data;
};

const removeSubject = async (classId, subjectId) => {
  const response = await axios.post(API_URL + 'remove-subject', { classId, subjectId });
  return response.data;
};

const updateSubject = async (classId, subjectId, updates) => {
  const response = await axios.put(API_URL + 'update-subject', { classId, subjectId, updates });
  return response.data;
};

const assignTeacher = async (classId, subjectId, teacherId) => {
  const response = await axios.post(API_URL + 'assign-teacher', { classId, subjectId, teacherId });
  return response.data;
};

const removeTeacher = async (classId, subjectId) => {
  const response = await axios.post(API_URL + 'remove-teacher', { classId, subjectId });
  return response.data;
};

const updateSchedule = async (classId, schedule) => {
  const response = await axios.put(API_URL + 'update-schedule', { classId, schedule });
  return response.data;
};

const classService = {
  getClasses,
  getClassDetails,
  addStudent,
  removeStudent,
  addSubject,
  removeSubject,
  updateSubject,
  assignTeacher,
  removeTeacher,
  updateSchedule,
};

export default classService;
