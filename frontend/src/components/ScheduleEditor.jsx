import React from 'react';

const ScheduleEditor = ({ schedule, subjects, onUpdateSchedule }) => {
  const addDay = () => {
    onUpdateSchedule([...schedule, { day: '', subjects: [] }]);
  };

  const updateDay = (index, day) => {
    const newSchedule = [...schedule];
    newSchedule[index].day = day;
    onUpdateSchedule(newSchedule);
  };

  const addSubjectToDay = (dayIndex) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].subjects.push({ subject: '', startTime: '', endTime: '' });
    onUpdateSchedule(newSchedule);
  };

  const updateSubjectInDay = (dayIndex, subjectIndex, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].subjects[subjectIndex][field] = value;
    onUpdateSchedule(newSchedule);
  };

  return (
    <div>
      {schedule.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={day.day}
            onChange={(e) => updateDay(dayIndex, e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Day"
          />
          {day.subjects.map((subjectSlot, subjectIndex) => (
            <div key={subjectIndex} className="flex mb-2">
              <select
                value={subjectSlot.subject}
                onChange={(e) => updateSubjectInDay(dayIndex, subjectIndex, 'subject', e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l"
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
              </select>
              <input
                type="time"
                value={subjectSlot.startTime}
                onChange={(e) => updateSubjectInDay(dayIndex, subjectIndex, 'startTime', e.target.value)}
                className="px-3 py-2 border"
              />
              <input
                type="time"
                value={subjectSlot.endTime}
                onChange={(e) => updateSubjectInDay(dayIndex, subjectIndex, 'endTime', e.target.value)}
                className="px-3 py-2 border rounded-r"
              />
            </div>
          ))}
          <button
            onClick={() => addSubjectToDay(dayIndex)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            Add Subject
          </button>
        </div>
      ))}
      <button
        onClick={addDay}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
      >
        Add Day
      </button>
    </div>
  );
};

export default ScheduleEditor;

