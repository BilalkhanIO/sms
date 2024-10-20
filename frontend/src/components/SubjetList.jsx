import React from 'react';

const SubjectList = ({ subjects, onUpdateSubject, onRemoveSubject, onAssignTeacher, onRemoveTeacher, teachers }) => {
  return (
    <div>
      {subjects.map((subject) => (
        <div key={subject._id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={subject.name}
            onChange={(e) => onUpdateSubject(subject._id, { name: e.target.value })}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <select
            value={subject.teacher?._id || ''}
            onChange={(e) => e.target.value ? onAssignTeacher(subject._id, e.target.value) : onRemoveTeacher(subject._id)}
            className="w-full px-3 py-2 border rounded mb-2"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
            ))}
          </select>
          <button
            onClick={() => onRemoveSubject(subject._id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove Subject
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;

