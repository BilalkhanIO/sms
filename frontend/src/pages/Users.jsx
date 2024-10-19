import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser } from '../slices/userSlice';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const Users = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { users = [], isLoading, error } = userState || {};
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeRole, setActiveRole] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((fetchedUsers) => {
        console.log('Fetched users:', fetchedUsers);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleCreateUser = async (userData) => {
    try {
      await dispatch(createUser(userData)).unwrap();
      setSuccessMessage('User created successfully');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await dispatch(updateUser(userData)).unwrap();
      setSelectedUser(null);
      setSuccessMessage('User updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      setSuccessMessage('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const filteredUsers = activeRole === 'all' 
    ? users 
    : users.filter(user => user.role === activeRole);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div className="mb-4">
        <button 
          onClick={() => setActiveRole('all')} 
          className={`mr-2 ${activeRole === 'all' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-3 py-1 rounded`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveRole('teacher')} 
          className={`mr-2 ${activeRole === 'teacher' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-3 py-1 rounded`}
        >
          Teachers
        </button>
        <button 
          onClick={() => setActiveRole('student')} 
          className={`mr-2 ${activeRole === 'student' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-3 py-1 rounded`}
        >
          Students
        </button>
        <button 
          onClick={() => setActiveRole('parent')} 
          className={`mr-2 ${activeRole === 'parent' ? 'bg-blue-500' : 'bg-gray-300'} text-white px-3 py-1 rounded`}
        >
          Parents
        </button>
      </div>
      <UserForm
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialData={selectedUser}
      />
      <UserList
        users={filteredUsers}
        onEdit={setSelectedUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Users;
