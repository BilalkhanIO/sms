import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
    // Add other fields as needed
  });

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
    setUserData({ name: '', email: '', role: 'student', password: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mr-2 p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mr-2 p-2 border rounded"
        required
      />
      <select
        name="role"
        value={userData.role}
        onChange={handleChange}
        className="mr-2 p-2 border rounded"
        required
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="parent">Parent</option>
      </select>
      {!initialData && (
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mr-2 p-2 border rounded"
          required
        />
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
