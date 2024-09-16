// services/attendanceService.js
import axios from 'axios';

const API_URL = '/api/attendance/';

const markAttendance = async (attendanceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, attendanceData, config);
  return response.data;
};

const getAttendance = async (classId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + classId, config);
  return response.data;
};

const attendanceService = {
  markAttendance,
  getAttendance,
};

export default attendanceService;
