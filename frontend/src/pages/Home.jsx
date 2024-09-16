import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to School Management System</h1>
      <p className="mb-8">Manage your school efficiently with our comprehensive system.</p>
      <div>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;