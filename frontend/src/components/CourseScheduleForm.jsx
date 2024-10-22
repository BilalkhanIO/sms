import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScheduleToCourse } from '../slices/courseSlice';

const CourseScheduleForm = ({ courseId }) => {
  const [scheduleData, setScheduleData] = useState({
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addScheduleToCourse({ courseId, scheduleData }));
    setScheduleData({ dayOfWeek: '', startTime: '', endTime: '', location: '' });
  };

  const handleChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Add Course Schedule</h3>
      <div>
        <label htmlFor="dayOfWeek" className="block mb-1">Day of Week</label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          value={scheduleData.dayOfWeek}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div>
        <label htmlFor="startTime" className="block mb-1">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={scheduleData.startTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="endTime" className="block mb-1">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={scheduleData.endTime}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={scheduleData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Schedule
      </button>
    </form>
  );
};

export default CourseScheduleForm;
