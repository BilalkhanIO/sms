import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../slices/classSlice';
import ClassForm from '../components/ClassForm';
import CourseForm from '../components/CourseForm';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const Classes = () => {
  const dispatch = useDispatch();
  const { classes, isLoading, error } = useSelector(state => state.class);
  const [editingClass, setEditingClass] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setEditingCourse(null);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={`Error loading classes: ${error}`} />;
  if (!Array.isArray(classes) || classes.length === 0) return <div>No classes found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Classes</h2>
      <ClassForm classToEdit={editingClass} onSubmit={() => setEditingClass(null)} />
      <div className="mt-8">
        {classes.map(classItem => (
          <div key={classItem._id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-semibold">{classItem.className}</h3>
            <button onClick={() => handleEditClass(classItem)} className="text-blue-500">Edit Class</button>
            <h4 className="text-lg font-semibold mt-4">Courses</h4>
            <ul>
              {classItem.courses && classItem.courses.map(course => (
                <li key={course._id}>
                  {course.courseName}
                  <button onClick={() => handleEditCourse(course)} className="text-blue-500 ml-2">Edit Course</button>
                </li>
              ))}
            </ul>
            <CourseForm classId={classItem._id} courseToEdit={editingCourse} onSubmit={() => setEditingCourse(null)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
