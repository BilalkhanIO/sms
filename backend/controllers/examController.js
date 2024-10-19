// controllers/examController.js
import asyncHandler from 'express-async-handler';
import Exam from '../models/Exam.js';

const createExam = asyncHandler(async (req, res) => {
  const { title, class: classId, date, duration, totalMarks, subject, description, examType } = req.body;

  const exam = await Exam.create({
    title,
    class: classId,
    date,
    duration,
    totalMarks,
    subject,
    description,
    examType,
  });

  res.status(201).json(exam);
});

const getExams = asyncHandler(async (req, res) => {
  const { classId } = req.query;

  const exams = await Exam.find({ class: classId }).populate('class', 'name');

  res.json(exams);
});

const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate('class', 'name');

  if (exam) {
    res.json(exam);
  } else {
    res.status(404);
    throw new Error('Exam not found');
  }
});

export { createExam, getExams, getExamById };
