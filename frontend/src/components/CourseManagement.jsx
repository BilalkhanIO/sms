import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, removeCourse, updateCourse } from '../slices/classSlice';

const CourseManagement = ({ classId }) => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.class.selectedClass);
  const [newCourse, setNewCourse] = useState({ name: '', description: '', teacher: '' });

  const handleAddCourse = () => {
    dispatch(addCourse({ classId, course: newCourse }));
    setNewCourse({ name: '', description: '', teacher: '' });
  };

  const handleRemoveCourse = (courseId) => {
    dispatch(removeCourse({ classId, courseId }));
  };

  const handleUpdateCourse = (courseId, updates) => {
    dispatch(updateCourse({ classId, courseId, updates }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={newCourse.teacher}
          onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
          className="mr-2 px-2 py-1 border rounded"
        />
        <button onClick={handleAddCourse} className="bg-blue-500 text-white px-4 py-2 rounded">Add Course</button>
      </div>
      <div>
        {courses.map((course) => (
          <div key={course._id} className="mb-2 p-2 border rounded">
            <input
              type="text"
              value={course.name}
              onChange={(e) => handleUpdateCourse(course._id, { name: e.target.value })}
              className="mr-2 px-2 py-1 border rounded"
            />
            <input
              type="text"
              value={course.description}
              onChange={(e) => handleUpdateCourse(course._id, { description: e.target.value })}
              className="mr-2 px-2 py-1 border rounded"
            />
            <button onClick={() => handleRemoveCourse(course._id)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
