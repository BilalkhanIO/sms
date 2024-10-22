import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse, updateCourse } from '../slices/courseSlice';

const CourseForm = ({ classId, courseToEdit, onSubmit }) => {
  const [courseData, setCourseData] = useState({
    courseId: '',
    courseName: '',
    description: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseToEdit) {
      setCourseData(courseToEdit);
    } else {
      setCourseData({ courseId: '', courseName: '', description: '' });
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseToEdit) {
      dispatch(updateCourse({ ...courseData, classId }));
    } else {
      dispatch(createCourse({ ...courseData, classId }));
    }
    setCourseData({ courseId: '', courseName: '', description: '' });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">{courseToEdit ? 'Edit Course' : 'Add New Course'}</h3>
      <div>
        <label htmlFor="courseId" className="block mb-1">Course ID</label>
        <input
          type="text"
          id="courseId"
          name="courseId"
          value={courseData.courseId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="courseName" className="block mb-1">Course Name</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={courseData.courseName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={courseData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {courseToEdit ? 'Update Course' : 'Add Course'}
      </button>
    </form>
  );
};

export default CourseForm;
