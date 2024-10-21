import React from 'react';

const StudentList = ({ students, onRemoveStudent }) => {
  console.log('Students received in StudentList:', students);
  return (
    <ul className="list-disc pl-5 mb-6">
      {students.map((student) => {
        const studentId = typeof student === 'string' ? student : student._id;
        const studentName = typeof student === 'string' ? 'Student ID: ' + student : student.name;
        return (
          <li key={studentId} className="mb-2 flex justify-between items-center">
            <span>{studentName}</span>
            <button
              onClick={() => onRemoveStudent(studentId)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default StudentList;
