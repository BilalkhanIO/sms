// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './components/DasboardLayout';
import PrivateRoute from './components/PrivateRoute';
import {
  Login,
  Register,
  Dashboard,
  Classes,
  Exams,
  Grades,
  Attendance,
  Notifications,
  Users,
  Home,
  ClassDetails,
} from './pages';
import CreateClass from './components/CreateClass';

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
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/exams" element={<Exams />} />
                  <Route path="/grades" element={<Grades />} />
                  {['admin', 'teacher'].includes(user.role) && (
                    <Route path="/attendance" element={<Attendance />} />
                  )}
                  <Route path="/notifications" element={<Notifications />} />
                  {user.role === 'admin' && <Route path="/users" element={<Users />} />}
                  <Route path="/create-class" element={<CreateClass />} />
                  <Route path="/classes/:id" element={<ClassDetails />} />
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
