import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollStudent, unenrollStudent } from '../slices/classSlice';

const StudentEnrollment = ({ classId }) => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.class.selectedClass);
  const allStudents = useSelector((state) => state.user.students);
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleEnrollStudent = () => {
    if (selectedStudent) {
      dispatch(enrollStudent({ classId, studentId: selectedStudent }));
      setSelectedStudent('');
    }
  };

  const handleUnenrollStudent = (studentId) => {
    dispatch(unenrollStudent({ classId, studentId }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Enrollment</h2>
      <div className="mb-4">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        >
          <option value="">Select a student</option>
          {allStudents.map((student) => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>
        <button onClick={handleEnrollStudent} className="bg-green-500 text-white px-4 py-2 rounded">Enroll Student</button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Enrolled Students</h3>
        {students.map((student) => (
          <div key={student._id} className="mb-2">
            {student.name}
            <button onClick={() => handleUnenrollStudent(student._id)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Unenroll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEnrollment;
