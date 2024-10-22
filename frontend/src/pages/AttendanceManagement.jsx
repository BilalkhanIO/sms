import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordAttendance, getAttendance, updateAttendance } from '../slices/attendanceSlice';
import { getCourses } from '../slices/courseSlice';
import AttendanceForm from '../components/AttendanceForm';

const AttendanceManagement = () => {
  const dispatch = useDispatch();
  const { courses, attendance, isLoading, error } = useSelector(state => state.attendance);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse && selectedDate) {
      dispatch(getAttendance({ courseId: selectedCourse, startDate: selectedDate, endDate: selectedDate }));
    }
  }, [selectedCourse, selectedDate, dispatch]);

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(recordAttendance({ courseId: selectedCourse, date: selectedDate, attendanceList }));
  };

  const handleAttendanceUpdate = (studentId, status) => {
    const updatedList = attendanceList.map(record => 
      record.studentId === studentId ? { ...record, status } : record
    );
    setAttendanceList(updatedList);
  };

  const handleBulkAttendanceUpdate = (status) => {
    const updatedList = attendanceList.map(record => ({ ...record, status }));
    setAttendanceList(updatedList);
  };

  const handleFetchAttendance = () => {
    if (selectedCourse && selectedDate) {
      dispatch(getAttendance({ courseId: selectedCourse, startDate: selectedDate, endDate: selectedDate }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Record Attendance</h2>
        <form onSubmit={handleAttendanceSubmit}>
          <div className="flex mb-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="mr-4 px-3 py-2 border rounded"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.courseName}</option>
              ))}
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded"
            />
          </div>
          {selectedCourse && selectedDate && (
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Comments</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map(record => (
                  <tr key={record.studentId}>
                    <td className="border p-2">{record.studentName}</td>
                    <td className="border p-2">
                      <select
                        value={record.status}
                        onChange={(e) => handleAttendanceUpdate(record.studentId, e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Excused">Excused</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={record.comments}
                        onChange={(e) => handleAttendanceUpdate(record.studentId, record.status, e.target.value)}
                        className="px-2 py-1 border rounded w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Save Attendance
          </button>
          <div className="mt-4">
            <button onClick={() => handleBulkAttendanceUpdate('Present')} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Mark All Present
            </button>
            <button onClick={() => handleBulkAttendanceUpdate('Absent')} className="bg-red-500 text-white px-4 py-2 rounded">
              Mark All Absent
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">View Attendance History</h2>
        <div className="flex mb-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mr-4 px-3 py-2 border rounded"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course._id}>{course.courseName}</option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded"
          />
          <button
            onClick={handleFetchAttendance}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Fetch Attendance
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {attendanceRecords.length > 0 && (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map(record => (
                <tr key={record.studentId}>
                  <td className="border p-2">{record.studentName}</td>
                  <td className="border p-2">{record.status}</td>
                  <td className="border p-2">{record.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export { AttendanceManagement };
