// src/pages/CreateClass.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createClass } from '../slices/classSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [classData, setClassData] = useState({
    name: '',
    description: '',
    batchStartYear: '',
    batchEndYear: '',
    subjects: []
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users?role=teacher', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchTeachers();
  }, [navigate]);

  const handleInputChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...classData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setClassData({ ...classData, subjects: newSubjects });
  };

  const addSubject = () => {
    setClassData({
      ...classData,
      subjects: [...classData.subjects, { name: '', teacher: '', schedule: [] }],
    });
  };

  const removeSubject = (index) => {
    const newSubjects = classData.subjects.filter((_, i) => i !== index);
    setClassData({ ...classData, subjects: newSubjects });
  };

  const addSchedule = (subjectIndex) => {
    const newSubjects = [...classData.subjects];
    newSubjects[subjectIndex].schedule.push({ day: '', startTime: '', endTime: '' });
    setClassData({ ...classData, subjects: newSubjects });
  };

  const removeSchedule = (subjectIndex, scheduleIndex) => {
    const newSubjects = [...classData.subjects];
    newSubjects[subjectIndex].schedule = newSubjects[subjectIndex].schedule.filter((_, i) => i !== scheduleIndex);
    setClassData({ ...classData, subjects: newSubjects });
  };

  const handleScheduleChange = (subjectIndex, scheduleIndex, field, value) => {
    const newSubjects = [...classData.subjects];
    newSubjects[subjectIndex].schedule[scheduleIndex][field] = value;
    setClassData({ ...classData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classData.name || !classData.batchStartYear || !classData.batchEndYear || classData.subjects.length === 0) {
      alert('Please fill in all required fields and add at least one subject');
      return;
    }

    for (const subject of classData.subjects) {
      if (!subject.name || !subject.teacher || subject.schedule.length === 0) {
        alert('Each subject must have a name, a teacher assigned, and at least one schedule');
        return;
      }
    }

    try {
      const result = await dispatch(createClass(classData)).unwrap();
      navigate(`/classes/${result._id}`);
    } catch (error) {
      console.error('Failed to create class:', error);
      alert(`Failed to create class: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Create New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Class Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={classData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={classData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="batchStartYear" className="block mb-1">Batch Start Year</label>
            <input
              type="number"
              id="batchStartYear"
              name="batchStartYear"
              value={classData.batchStartYear}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="batchEndYear" className="block mb-1">Batch End Year</label>
            <input
              type="number"
              id="batchEndYear"
              name="batchEndYear"
              value={classData.batchEndYear}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Subjects</h3>
          {classData.subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="mb-4 p-4 border rounded">
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(subjectIndex, 'name', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                required
              />
              <select
                value={subject.teacher}
                onChange={(e) => handleSubjectChange(subjectIndex, 'teacher', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                required
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSubject(subjectIndex)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove Subject
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubject}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
