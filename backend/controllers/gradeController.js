// controllers/gradeController.js
import asyncHandler from 'express-async-handler';
import Grade from '../models/Grade.js';

const createGrade = asyncHandler(async (req, res) => {
  const { class: classId, assignmentName, grades, totalPoints, dueDate } = req.body;

  const grade = await Grade.create({
    class: classId,
    assignmentName,
    grades,
    totalPoints,
    dueDate,
  });

  res.status(201).json(grade);
});

const getGrades = asyncHandler(async (req, res) => {
  const { classId } = req.query;

  const grades = await Grade.find({ class: classId })
    .populate('class', 'name')
    .populate('grades.student', 'name');

  res.json(grades);
});

const updateGrade = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { grades } = req.body;

  const grade = await Grade.findById(id);

  if (!grade) {
    res.status(404);
    throw new Error('Grade not found');
  }

  grade.grades = grades;
  await grade.save();

  res.json(grade);
});

export { createGrade, getGrades, updateGrade };
