// components/AttendanceForm.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAttendance } from '../slices/attendanceSlice';

const AttendanceForm = ({ classId, date }) => {
  const dispatch = useDispatch();
  const { attendanceRecords, isLoading } = useSelector((state) => state.attendance);
  const { students } = useSelector((state) => state.class);
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const initialData = {};
    students.forEach(student => {
      const existingRecord = attendanceRecords.find(record => record.student._id === student._id);
      initialData[student._id] = existingRecord ? existingRecord.status : 'present';
    });
    setAttendanceData(initialData);
  }, [students, attendanceRecords]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = Object.entries(attendanceData).map(([studentId, status]) => ({
      student: studentId,
      status
    }));
    dispatch(markAttendance({ classId, date, attendanceData: formattedData }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
      {students.map((student) => (
        <div key={student._id} className="flex items-center space-x-2">
          <span>{student.name}</span>
          <select
            value={attendanceData[student._id] || 'present'}
            onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
