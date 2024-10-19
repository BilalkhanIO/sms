// src/pages/Attendance.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendance, markAttendance } from '../slices/attendanceSlice';
import { getClasses } from '../slices/classSlice';
import { LoadingSpinner, ErrorMessage } from '../components';

const Attendance = () => {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector((state) => state.attendance);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAttendance({ classId: selectedClass, date: selectedDate }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="class" className="block mb-1">Class</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>{cls.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1">Date</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          View Attendance
        </button>
      </form>
      {selectedClass && <AttendanceForm classId={selectedClass} date={selectedDate} />}
    </div>
  );
};

export default Attendance;
