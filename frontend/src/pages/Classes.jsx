// src/pages/Classes.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getClasses } from '../slices/classSlice';
import { logout } from '../slices/authSlice';
import ClassSchedule from '../components/ClassSchedule';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ClassCard from '../components/ClassCard';

const Classes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, isLoading, error } = useSelector((state) => state.class);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Classes</h2>
        <Link
          to="/create-class"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Class
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search classes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-6"
      />
      {filteredClasses.length === 0 ? (
        <p className="text-center">No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => cls && <ClassCard key={cls._id} cls={cls} />)}
        </div>
      )}
    </div>
  );
};

export default Classes;
