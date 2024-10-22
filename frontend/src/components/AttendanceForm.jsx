import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordAttendance } from '../slices/attendanceSlice';
import { getStudentsByCourse } from '../slices/userSlice';

const AttendanceForm = ({ courseId, classId }) => {
  const [date, setDate] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.user);

  useEffect(() => {
    if (courseId) {
      dispatch(getStudentsByCourse(courseId));
    }
  }, [courseId, dispatch]);

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(recordAttendance({ courseId, classId, date, attendanceList }));
  };

  const handleAttendanceUpdate = (studentId, status) => {
    const updatedList = attendanceList.map(record =>
      record.studentId === studentId ? { ...record, status } : record
    );
    setAttendanceList(updatedList);
  };

  return (
    <form onSubmit={handleAttendanceSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">
                <select
                  value={attendanceList.find(record => record.studentId === student._id)?.status || ''}
                  onChange={(e) => handleAttendanceUpdate(student._id, e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="">Select Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Excused">Excused</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
