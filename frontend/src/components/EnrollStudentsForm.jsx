import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollStudentsInCourse } from '../slices/courseSlice';
import { getStudents } from '../slices/userSlice';

const EnrollStudentsForm = ({ courseId }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(enrollStudentsInCourse({ courseId, studentIds: selectedStudents }));
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Enroll Students</h3>
      <div className="space-y-2">
        {students.map(student => (
          <label key={student._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedStudents.includes(student._id)}
              onChange={() => handleStudentSelection(student._id)}
            />
            <span>{student.name}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Enroll Students
      </button>
    </form>
  );
};

export default EnrollStudentsForm;

