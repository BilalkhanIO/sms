import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetails } from '../slices/teacherSlice';
import { Table } from '../components';

const TeacherProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentTeacher, isLoading, error } = useSelector(state => state.teacher);

  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  const courseColumns = [
    { header: 'Course Name', accessor: 'courseName' },
    { header: 'Class', accessor: 'className' },
    { header: 'Schedule', accessor: 'schedule' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{currentTeacher.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
          <p>Teacher ID: {currentTeacher.teacherId}</p>
          <p>Email: {currentTeacher.email}</p>
          <p>Phone: {currentTeacher.phone}</p>
          <p>Subjects Taught: {currentTeacher.subjectsTaught.join(', ')}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Assigned Courses</h2>
          <Table columns={courseColumns} data={currentTeacher.assignedCourses} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Availability Schedule</h2>
        {/* Implement a weekly schedule view component here */}
      </div>
    </div>
  );
};

export default TeacherProfile;
