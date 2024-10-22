// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../slices/dashboardSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import ParentDashboard from "./ParentDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useSelector((state) => state.dashboard) || {}; // Add fallback to prevent destructuring error

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const renderDashboard = () => {
    if (!user || !user.role) {
      return <ErrorMessage message="User information not available" />;
    }

    switch (user.role) {
      case 'admin':
        return <AdminDashboard data={data} />;
      case 'teacher':
        return <TeacherDashboard data={data} />;
      case 'student':
        return <StudentDashboard data={data} />;
      case 'parent':
        return <ParentDashboard data={data} />;
      default:
        return <ErrorMessage message="Invalid user role" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      {renderDashboard()}
    </div>
  );
};

export { Dashboard }; // Ensure this is a default export
