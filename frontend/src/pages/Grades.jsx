// src/pages/Grades.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGrades, createGrade } from '../slices/gradeSlice';

const Grades = () => {
  const dispatch = useDispatch();
  const { grades, isLoading, error } = useSelector((state) => state.grades);
  const [selectedClass, setSelectedClass] = useState('');
  const [newGrade, setNewGrade] = useState({
    assignmentName: '',
    totalPoints: 0,
    dueDate: '',
  });

  useEffect(() => {
    dispatch(getGrades());
  }, [dispatch]);

  const handleCreateGrade = (e) => {
    e.preventDefault();
    dispatch(createGrade({ ...newGrade, class: selectedClass }));
    setNewGrade({ assignmentName: '', totalPoints: 0, dueDate: '' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Grades</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Create New Grade</h3>
        <form onSubmit={handleCreateGrade} className="space-y-4">
          <div>
            <label htmlFor="class" className="block mb-1">Class</label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a class</option>
              {grades.classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="assignmentName" className="block mb-1">Assignment Name</label>
            <input
              type="text"
              id="assignmentName"
              value={newGrade.assignmentName}
              onChange={(e) => setNewGrade({ ...newGrade, assignmentName: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="totalPoints" className="block mb-1">Total Points</label>
            <input
              type="number"
              id="totalPoints"
              value={newGrade.totalPoints}
              onChange={(e) => setNewGrade({ ...newGrade, totalPoints: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block mb-1">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={newGrade.dueDate}
              onChange={(e) => setNewGrade({ ...newGrade, dueDate: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Create Grade
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Grade List</h3>
        {grades.gradeList.map((grade) => (
          <div key={grade._id} className="bg-white p-4 rounded shadow mb-4">
            <h4 className="text-lg font-semibold">{grade.assignmentName}</h4>
            <p>Class: {grade.class.name}</p>
            <p>Total Points: {grade.totalPoints}</p>
            <p>Due Date: {new Date(grade.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;
