// services/classService.js
import axios from 'axios';

const API_URL = '/api/classes/';

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getClasses = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

const getClassDetails = async (classId) => {
  const response = await axios.get(`${API_URL}/${classId}`, getConfig());
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

const createClass = async (classData) => {
  const response = await axios.post(API_URL, classData, getConfig());
  return response.data;
};

const getStudentDetails = async (studentId) => {
  const response = await axios.get(`${API_URL}student/${studentId}`, getConfig());
  return response.data;
};

const addCourse = async (classId, course) => {
  const response = await axios.post(`/api/classes/${classId}/courses`, { course });
  return response.data;
};

const removeCourse = async (classId, courseId) => {
  const response = await axios.delete(`/api/classes/${classId}/courses/${courseId}`);
  return response.data;
};

const updateCourse = async (classId, courseId, updates) => {
  const response = await axios.put(`/api/classes/${classId}/courses/${courseId}`, updates);
  return response.data;
};

const enrollStudent = async (classId, studentId) => {
  const response = await axios.post(`/api/classes/${classId}/students`, { studentId });
  return response.data;
};

const unenrollStudent = async (classId, studentId) => {
  const response = await axios.delete(`/api/classes/${classId}/students/${studentId}`);
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
  getStudentDetails,
  addCourse,
  removeCourse,
  updateCourse,
  enrollStudent,
  unenrollStudent
};

export default classService;
