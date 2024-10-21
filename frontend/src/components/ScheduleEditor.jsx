import React from 'react';

const ScheduleEditor = ({ schedule, onUpdateSchedule }) => {
  const addScheduleItem = () => {
    onUpdateSchedule([...schedule, { dayOfWeek: '', startTime: '', endTime: '', location: '', teachers: [] }]);
  };

  const updateScheduleItem = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    onUpdateSchedule(newSchedule);
  };

  return (
    <div>
      {schedule.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={item.dayOfWeek}
            onChange={(e) => updateScheduleItem(index, 'dayOfWeek', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Day of Week"
          />
          <input
            type="time"
            value={item.startTime}
            onChange={(e) => updateScheduleItem(index, 'startTime', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="time"
            value={item.endTime}
            onChange={(e) => updateScheduleItem(index, 'endTime', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="text"
            value={item.location}
            onChange={(e) => updateScheduleItem(index, 'location', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Location"
          />
          {/* Add teacher selection here */}
        </div>
      ))}
      <button
        onClick={addScheduleItem}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Schedule Item
      </button>
    </div>
  );
};

export default ScheduleEditor;
