//controllers/gradeController
import asyncHandler from 'express-async-handler';
import Grade from '../models/Grade.js';

// @desc    Get grades
// @route   GET /api/grades
// @access  Private
const getGrades = asyncHandler(async (req, res) => {
  const { studentId, classId } = req.query;
  const filter = {};
  if (studentId) filter.student = studentId;
  if (classId) filter.class = classId;

  const grades = await Grade.find(filter)
    .populate('class', 'name')
    .populate('student', 'name');
  res.json(grades);
});

// @desc    Add a grade
// @route   POST /api/grades
// @access  Private/Teacher/Admin
const addGrade = asyncHandler(async (req, res) => {
  const { classId, studentId, assignmentName, score } = req.body;

  const grade = await Grade.create({
    class: classId,
    student: studentId,
    assignmentName,
    score
  });

  res.status(201).json(grade);
});

// @desc    Update a grade
// @route   PUT /api/grades/:id
// @access  Private/Teacher/Admin
const updateGrade = asyncHandler(async (req, res) => {
  const { assignmentName, score } = req.body;

  const grade = await Grade.findById(req.params.id);

  if (grade) {
    grade.assignmentName = assignmentName || grade.assignmentName;
    grade.score = score || grade.score;

    const updatedGrade = await grade.save();
    res.json(updatedGrade);
  } else {
    res.status(404);
    throw new Error('Grade not found');
  }
});

export { getGrades, addGrade, updateGrade };