import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails, addStudent, removeStudent, addSubject, removeSubject, updateSubject, assignTeacher, updateSchedule } from '../slices/classSlice';
import { logout } from '../slices/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SubjectCard from '../components/SubjectCard';
import StudentList from '../components/StudentList';
import CourseManagement from '../components/CourseManagement';
import StudentEnrollment from '../components/StudentEnrollment';
import ReportGeneration from '../components/ReportGeneration';

const ClassDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedClass, isLoading, error } = useSelector((state) => state.class);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    dispatch(getClassDetails(id));
  }, [dispatch, id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!selectedClass) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">{selectedClass.name}</h2>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('details')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Class Details
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Students
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Reports
        </button>
      </div>

      {activeTab === 'details' && (
        <div>
          <p><strong>Description:</strong> {selectedClass.description}</p>
          <p><strong>Batch:</strong> {selectedClass.batchStartYear} - {selectedClass.batchEndYear}</p>
          {/* Add more class details here */}
        </div>
      )}

      {activeTab === 'courses' && (
        <CourseManagement classId={id} />
      )}

      {activeTab === 'students' && (
        <StudentEnrollment classId={id} />
      )}

      {activeTab === 'reports' && (
        <ReportGeneration classId={id} />
      )}
    </div>
  );
};

export default ClassDetails;
