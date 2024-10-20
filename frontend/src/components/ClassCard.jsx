import React from 'react';

const ClassCard = ({ cls }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
      <p className="text-gray-600 mb-4">{cls.description}</p>
      <p className="text-sm text-gray-500">
        Batch: {cls.batchStartYear} - {cls.batchEndYear}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Students: {cls.students.length}
      </p>
      <p className="text-sm text-gray-500">
        Subjects: {cls.subjects.length}
      </p>
    </div>
  );
};

export default ClassCard;
