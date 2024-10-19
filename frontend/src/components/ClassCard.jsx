import React from 'react';
import { Link } from 'react-router-dom';
import { ClassSchedule } from '../components';

const ClassCard = ({ cls }) => (
  <Link
    to={`/classes/${cls._id}`}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <h3 className="text-xl font-semibold mb-3">{cls.name}</h3>
    <p className="mb-2">Teacher: {cls.teacher.name}</p>
    <p className="mb-4">Students: {cls.students.length}</p>
    <ClassSchedule schedule={cls.schedule} />
  </Link>
);

export default ClassCard;

