// services/attendanceService.js
import axios from 'axios';

const API_URL = '/api/attendance/';

const getAttendance = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const markAttendance = async (attendanceData) => {
  const response = await axios.post(API_URL, attendanceData);
  return response.data;
};

const attendanceService = {
  getAttendance,
  markAttendance,
};

export default attendanceService;
