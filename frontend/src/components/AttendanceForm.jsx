// components/AttendanceForm.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance, getAttendance } from '../slices/attendanceSlice';

const AttendanceForm = ({ classId }) => {
  const dispatch = useDispatch();
  const { attendances, isLoading, isError, message } = useSelector((state) => state.attendance);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    dispatch(getAttendance(classId));
  }, [dispatch, classId]);

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: isPresent }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(markAttendance({ classId, attendanceData }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      {attendances.map((attendance) => (
        <div key={attendance.student._id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={attendance.student._id}
            checked={attendanceData[attendance.student._id] || false}
            onChange={(e) => handleAttendanceChange(attendance.student._id, e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor={attendance.student._id} className="text-gray-700">
            {attendance.student.name}
          </label>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Attendance
      </button>
    </form>
  );
};