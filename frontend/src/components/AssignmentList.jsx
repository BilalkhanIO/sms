import React from 'react';

const AssignmentList = ({ assignments }) => {
  return (
    <div className="assignment-list">
      <h3 className="text-lg font-semibold mb-4">Assignments</h3>
      <ul className="space-y-2">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="bg-gray-100 p-2 rounded">
            <span className="font-medium">{assignment.title}</span>
            <span className="text-sm text-gray-500 ml-2">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;

