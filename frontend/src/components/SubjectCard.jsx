import React from 'react';
import { ClassSchedule } from '../components';

const SubjectCard = ({ subject }) => (
  <div className="mb-4 p-4 border rounded">
    <h4 className="text-lg font-semibold">{subject.name}</h4>
    <p><strong>Teacher:</strong> {subject.teacher}</p>
    <h5 className="font-semibold mt-2">Schedule:</h5>
    <ClassSchedule schedule={subject.schedule} />
  </div>
);

export default SubjectCard;

