import React from 'react';

const StudentList = ({ students }) => (
  <ul className="list-disc pl-5 mb-6">
    {students.map((student) => (
      <li key={student._id}>
        {student.name}
        {student.isMentor && ' (Mentor)'}
        {student.isProctor && ' (Proctor)'}
      </li>
    ))}
  </ul>
);

export default StudentList;

