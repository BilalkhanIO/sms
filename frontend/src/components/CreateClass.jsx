// src/pages/CreateClass.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, updateClass } from '../slices/classSlice';
import { getTeachers } from '../slices/userSlice';
import { getCourses } from '../slices/courseSlice';
import { getClassDetails } from '../slices/classSlice';

const CreateEditClass = ({ classId = null }) => {
  const dispatch = useDispatch();
  const [classData, setClassData] = useState({
    name: '',
    description: '',
    teacher: '',
    courses: []
  });
  const { teachers } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getTeachers());
    // Assuming you have an action to get all courses
    dispatch(getCourses());
    
    if (classId) {
      // If classId is provided, fetch class details and set classData
      dispatch(getClassDetails(classId)).then(res => {
        setClassData(res.payload);
      });
    }
  }, [dispatch, classId]);

  const handleInputChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
    setClassData({ ...classData, courses: selectedCourses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classId) {
      dispatch(updateClass({ classId, classData }));
    } else {
      dispatch(createClass(classData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block mb-2">Class Name</label>
        <input
          type="text"
          name="name"
          value={classData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={classData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Assign Teacher</label>
        <select
          name="teacher"
          value={classData.teacher}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select a teacher</option>
          {teachers.map(teacher => (
            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Select Courses</label>
        <select
          multiple
          name="courses"
          value={classData.courses}
          onChange={handleCourseChange}
          className="w-full px-3 py-2 border rounded"
        >
          {courses.map(course => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {classId ? 'Update Class' : 'Create Class'}
      </button>
    </form>
  );
};

export default CreateEditClass;
