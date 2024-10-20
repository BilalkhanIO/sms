// src/pages/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register({ name, email, password, role })).unwrap();
      if (result) {
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

return (
<div className="max-w-md mx-auto mt-10">
<h2 className="text-2xl font-bold mb-5">Register</h2>
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block mb-1">Name</label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-3 py-2 border rounded"
      required
    />
  </div>
  <div>
    <label htmlFor="email" className="block mb-1">Email</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-3 py-2 border rounded"
      required
    />
  </div>
  <div>
    <label htmlFor="password" className="block mb-1">Password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-3 py-2 border rounded"
      required
    />
  </div>
  <div>
    <label htmlFor="role" className="block mb-1">Role</label>
    <select
      id="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-3 py-2 border rounded"
    >
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="admin">Admin</option>
    </select>
  </div>
  {error && <p className="text-red-500">{error}</p>}
  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={isLoading}>
    {isLoading ? 'Registering...' : 'Register'}
  </button>
</form>
</div>
);
};

export default Register;
