import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  if (!Array.isArray(users)) {
    return <div>No users available</div>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {users.map(user => (
        <li key={user._id} className="py-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600 capitalize">{user.role}</p>
          </div>
          <div>
            <button 
              onClick={() => onEdit(user)} 
              className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(user._id)} 
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
