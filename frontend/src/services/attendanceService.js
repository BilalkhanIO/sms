import axiosWithAuth from '../utils/axiosWithAuth';

const attendanceService = {
  recordAttendance: async (attendanceData) => {
    const response = await axiosWithAuth.post('/api/attendance', attendanceData);
    return response.data;
  },

  getAttendance: async (courseId, startDate, endDate) => {
    const response = await axiosWithAuth.get(`/api/attendance/${courseId}`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  updateAttendance: async (id, attendanceList) => {
    const response = await axiosWithAuth.put(`/api/attendance/${id}`, { attendanceList });
    return response.data;
  },
};

export default attendanceService;
