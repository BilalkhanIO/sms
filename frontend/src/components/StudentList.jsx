import React from 'react';

const StudentList = ({ students, onRemoveStudent }) => {
  return (
    <ul className="list-disc pl-5 mb-6">
      {students.map((student) => (
        <li key={student._id} className="mb-2 flex justify-between items-center">
          <span>{student.name}</span>
          <button
            onClick={() => onRemoveStudent(student._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
