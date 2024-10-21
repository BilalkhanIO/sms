import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollStudent, unenrollStudent, assignCourse, unassignCourse } from '../slices/classSlice';

const StudentEnrollment = ({ classId }) => {
  const dispatch = useDispatch();
  const { students, courses } = useSelector((state) => state.class.selectedClass);
  const allStudents = useSelector((state) => state.user.students);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnrollStudent = () => {
    if (selectedStudent) {
      dispatch(enrollStudent({ classId, studentId: selectedStudent }));
      setSelectedStudent('');
    }
  };

  const handleUnenrollStudent = (studentId) => {
    dispatch(unenrollStudent({ classId, studentId }));
  };

  const handleAssignCourse = (studentId) => {
    if (selectedCourse) {
      dispatch(assignCourse({ classId, studentId, courseId: selectedCourse }));
      setSelectedCourse('');
    }
  };

  const handleUnassignCourse = (studentId, courseId) => {
    dispatch(unassignCourse({ classId, studentId, courseId }));
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
            <span>{student.name}</span>
            <button onClick={() => handleUnenrollStudent(student._id)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">Unenroll</button>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="ml-2 px-2 py-1 border rounded"
            >
              <option value="">Assign Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
            <button onClick={() => handleAssignCourse(student._id)} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Assign</button>
            <div className="ml-4">
              {student.courses && student.courses.map((course) => (
                <div key={course._id}>
                  <span>{course.name}</span>
                  <button onClick={() => handleUnassignCourse(student._id, course._id)} className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded">Unassign</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEnrollment;
