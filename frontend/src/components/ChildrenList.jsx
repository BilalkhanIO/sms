import React from 'react';
import { Link } from 'react-router-dom';

const ChildrenList = ({ children }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Children</h3>
      <ul className="space-y-2">
        {children.map((child) => (
          <li key={child._id}>
            <Link to={`/student/${child._id}`} className="text-blue-600 hover:underline">
              {child.name} - Grade: {child.grade}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildrenList;

