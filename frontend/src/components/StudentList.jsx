import React from 'react';

const StudentList = ({ students, onRemoveStudent }) => {
  console.log('Students received in StudentList:', students);

  if (!Array.isArray(students) || students.length === 0) {
    return <p>No students enrolled in this class.</p>;
  }

  return (
    <ul className="space-y-2">
      {students.map((student) => (
        <li key={student._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span>{student.name}</span> {/* Ensure student.name is a string */}
          <button
            onClick={() => onRemoveStudent(student._id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
