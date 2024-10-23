// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import {
  Login,
  Register,
  Dashboard,
  Users,
  Home,
  AttendanceManagement,
  ClassDashboard,
} from './pages';

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
      {user ? (
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  {user.role === 'admin' && <Route path="/users" element={<Users />} />}
                  {(user.role === 'admin' || user.role === 'teacher') && (
                    <Route path="/attendance" element={<AttendanceManagement />} />
                  )}
                  <Route path="/classes" element={<ClassDashboard />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      ) : null}
    </Routes>
  );
}

export default App;
