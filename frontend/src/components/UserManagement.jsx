// components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser } from '../slices/userSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((state) => state.user);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(newUser));
    setNewUser({ name: '', email: '', role: 'student' });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add User
        </button>
      </form>

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
