//frontend/Pages/AttendanceManagement.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAttendance, markAttendance } from '../slices/attendanceSlice';
import { getClasses } from '../slices/classSlice';
import Navigation from '../components/Navigation';

function AttendanceManagement() {
  const dispatch = useDispatch();
  const { attendance, isLoading, isError, message } = useSelector((state) => state.attendance);
  const { classes } = useSelector((state) => state.class);
  const [formData, setFormData] = useState({ classId: '', date: '', studentId: '', status: 'present' });

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getAttendance());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(markAttendance(formData));
    setFormData({ ...formData, studentId: '', status: 'present' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <select
            name="classId"
            value={formData.classId}
            onChange={handleInputChange}
            className="mr-2 p-2 border rounded"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mr-2 p-2 border rounded"
          />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            placeholder="Student ID"
            className="mr-2 p-2 border rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mr-2 p-2 border rounded"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mark Attendance</button>
        </form>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Class</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Student</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{new Date(record.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{record.class?.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{record.student?.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AttendanceManagement;