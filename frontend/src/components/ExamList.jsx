// components/ExamList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { examService } from '../services/examService';

const ExamList = ({ classId }) => {
  const dispatch = useDispatch();
  const { exams, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(examService.getExams(classId));
  }, [dispatch, classId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exams</h2>
      <ul className="space-y-2">
        {exams.map((exam) => (
          <li key={exam._id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold">{exam.title}</h3>
            <p>Date: {new Date(exam.date).toLocaleDateString()}</p>
            <p>Subject: {exam.subject}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
