import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentDetails } from '../slices/studentSlice';
import { Table, Chart } from '../components';

const StudentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentStudent, isLoading, error } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(getStudentDetails(id));
  }, [dispatch, id]);

  const enrollmentColumns = [
    { header: 'Class Name', accessor: 'className' },
    { header: 'Course Name', accessor: 'courseName' },
  ];

  const attendanceColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Course', accessor: 'course' },
    { header: 'Status', accessor: 'status' },
    { header: 'Comments', accessor: 'comments' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{currentStudent.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
          <p>Student ID: {currentStudent.studentId}</p>
          <p>Grade Level: {currentStudent.gradeLevel}</p>
          <p>Email: {currentStudent.email}</p>
          <p>Phone: {currentStudent.phone}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Enrollment Information</h2>
          <Table columns={enrollmentColumns} data={currentStudent.enrollments} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Attendance History</h2>
        <Table columns={attendanceColumns} data={currentStudent.attendanceHistory} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Academic Performance</h2>
        <Chart title="Grade History" data={currentStudent.gradeHistory} />
        <button onClick={() => handleGenerateReportCard()} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Generate Report Card</button>
      </div>
    </div>
  );
};

export default StudentProfile;
