import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTeachersToCourse } from '../slices/courseSlice';
import { getTeachers } from '../slices/userSlice';

const AssignTeachersForm = ({ courseId }) => {
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const dispatch = useDispatch();
  const { teachers } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(assignTeachersToCourse({ courseId, teacherIds: selectedTeachers }));
  };

  const handleTeacherSelection = (teacherId) => {
    setSelectedTeachers(prev => 
      prev.includes(teacherId) 
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Assign Teachers</h3>
      <div className="space-y-2">
        {teachers.map(teacher => (
          <label key={teacher._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTeachers.includes(teacher._id)}
              onChange={() => handleTeacherSelection(teacher._id)}
            />
            <span>{teacher.name}</span>
          </label>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Assign Teachers
      </button>
    </form>
  );
};

export default AssignTeachersForm;

