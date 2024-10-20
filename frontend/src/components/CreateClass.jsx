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
    subjects: [],
    students: []
  });
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeachersAndStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const [teachersResponse, studentsResponse] = await Promise.all([
          axios.get('/api/users?role=teacher', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/users?role=student', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setTeachers(teachersResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Failed to fetch teachers or students:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchTeachersAndStudents();
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

  const handleStudentChange = (selectedStudents) => {
    setClassData({ ...classData, students: selectedStudents });
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-2xl font-bold">Create New Class</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={classData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Subjects</h3>
          {classData.subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="mb-4 p-4 border rounded">
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(subjectIndex, 'name', e.target.value)}
                className="mb-2 w-full px-3 py-2 border rounded"
                required
              />
              <select
                value={subject.teacher}
                onChange={(e) => handleSubjectChange(subjectIndex, 'teacher', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="" disabled>Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSubject(subjectIndex)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
        <div>
          <h3 className="text-lg font-semibold mb-2">Students</h3>
          <select
            multiple
            value={classData.students}
            onChange={(e) => handleStudentChange([...e.target.selectedOptions].map(option => option.value))}
            className="w-full px-3 py-2 border rounded"
          >
            {students.map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClass;
