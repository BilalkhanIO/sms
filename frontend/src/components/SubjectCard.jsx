import React from 'react';

const SubjectCard = ({ subject, onRemove }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{subject.name}</h4>
        <p>Teacher: {subject.teacher.name}</p>
        {subject.schedule && subject.schedule.map((sch, index) => (
          <p key={index}>
            {sch.day}: {sch.startTime} - {sch.endTime}
          </p>
        ))}
      </div>
      <button
        onClick={onRemove}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default SubjectCard;
