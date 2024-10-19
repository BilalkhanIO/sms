import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetails } from '../slices/classSlice';
import { logout } from '../slices/authSlice';
import ClassSchedule from '../components/ClassSchedule';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SubjectCard from '../components/SubjectCard';
import StudentList from '../components/StudentList';

const ClassDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedClass, isLoading, error } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(getClassDetails(id));
  }, [dispatch, id]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    if (error === 'Authentication failed. Please log in again.') {
      return (
        <div className="text-center mt-8">
          <p>Your session has expired. Please log in again.</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      );
    }
    return <ErrorMessage message={error} />;
  }

  if (!selectedClass) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">{selectedClass.name}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4"><strong>Description:</strong> {selectedClass.description}</p>
        <p className="mb-4"><strong>Batch:</strong> {selectedClass.batchStartYear} - {selectedClass.batchEndYear}</p>
        <h3 className="text-xl font-semibold mt-6 mb-4">Subjects</h3>
        {selectedClass.subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
        <h3 className="text-xl font-semibold mt-6 mb-4">Students</h3>
        <StudentList students={selectedClass.students} />
      </div>
    </div>
  );
};

export default ClassDetails;
