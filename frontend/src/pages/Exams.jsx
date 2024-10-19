// src/pages/Exams.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import examService from '../services/examService';

const Exams = () => {
  const dispatch = useDispatch();
  const { exams, isLoading, error } = useSelector((state) => state.exams);
  const [selectedClass, setSelectedClass] = useState('');
  const [newExam, setNewExam] = useState({
    title: '',
    date: '',
    duration: 0,
    totalMarks: 0,
    subject: '',
    description: '',
    examType: '',
  });

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const handleCreateExam = (e) => {
    e.preventDefault();
    dispatch(createExam({ ...newExam, class: selectedClass }));
    setNewExam({
      title: '',
      date: '',
      duration: 0,
      totalMarks: 0,
      subject: '',
      description: '',
      examType: '',
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Exams</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Create New Exam</h3>
        <form onSubmit={handleCreateExam} className="space-y-4">
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
              {exams.classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={newExam.title}
              onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={newExam.date}
              onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="block mb-1">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              value={newExam.duration}
              onChange={(e) => setNewExam({ ...newExam, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="totalMarks" className="block mb-1">Total Marks</label>
            <input
              type="number"
              id="totalMarks"
              value={newExam.totalMarks}
              onChange={(e) => setNewExam({ ...newExam, totalMarks: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              value={newExam.subject}
              onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              id="description"
              value={newExam.description}
              onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label htmlFor="examType" className="block mb-1">Exam Type</label>
            <select
              id="examType"
              value={newExam.examType}
              onChange={(e) => setNewExam({ ...newExam, examType: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select exam type</option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
              <option value="assignment">Assignment</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Create Exam
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Exam List</h3>
        {exams.examList.map((exam) => (
          <div key={exam._id} className="bg-white p-4 rounded shadow mb-4">
            <h4 className="text-lg font-semibold">{exam.title}</h4>
            <p>Class: {exam.class.name}</p>
            <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
            <p>Duration: {exam.duration} minutes</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <p>Subject: {exam.subject}</p>
            <p>Exam Type: {exam.examType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
