// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">School Management System</Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/classes" className="hover:text-blue-200">Classes</Link>
            <Link to="/attendance" className="hover:text-blue-200">Attendance</Link>
            <Link to="/grades" className="hover:text-blue-200">Grades</Link>
            <Link to="/exams" className="hover:text-blue-200">Exams</Link>
            <Link to="/notifications" className="hover:text-blue-200">Notifications</Link>
            <Link to="/files" className="hover:text-blue-200">Files</Link>
            <Link to="/create-class" className="hover:text-blue-200">Create Class</Link>
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:text-blue-200">Login</Link>
            <Link to="/register" className="hover:text-blue-200">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
