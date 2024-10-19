import React from 'react';

const ClassSchedule = ({ schedule }) => {
  return (
    <div className="class-schedule">
      <ul className="space-y-2">
        {schedule.map((slot, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded">
            <span className="font-medium">{slot.day}:</span>
            <span className="ml-2">{slot.startTime} - {slot.endTime}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassSchedule;
