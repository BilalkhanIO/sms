// controllers/classController.js
import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';
import mongoose from 'mongoose';

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private (Admin, Teacher)
const createClass = asyncHandler(async (req, res) => {
  const { name, description, batchStartYear, batchEndYear, subjects } = req.body;

  console.log('Received class data:', JSON.stringify({ name, description, batchStartYear, batchEndYear, subjects }, null, 2));

  if (!name || !batchStartYear || !batchEndYear || !subjects || subjects.length === 0) {
    console.log('Validation failed: Missing required fields');
    res.status(400);
    throw new Error('Please provide class name, batch years, and at least one subject with a teacher');
  }

  const hasValidSubjects = subjects.every(subject => 
    subject.name && mongoose.Types.ObjectId.isValid(subject.teacher)
  );
  if (!hasValidSubjects) {
    console.log('Validation failed: Subject missing name or valid teacher ID');
    res.status(400);
    throw new Error('Each subject must have a name and a valid teacher ID assigned');
  }

  console.log('Received subjects:', JSON.stringify(subjects, null, 2));

  try {
    console.log('Attempting to create new class');
    const newClass = await Class.create({
      name,
      description,
      batchStartYear,
      batchEndYear,
      subjects,
    });

    console.log('New class created:', JSON.stringify(newClass, null, 2));
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(400);
    throw new Error(`Failed to create class: ${error.message}`);
  }
});

// @desc    Get all classes
// @route   GET /api/classes
// @access  Private
const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find()
    .populate('subjects.teacher', 'name')
    .populate('students.student', 'name');
  res.json(classes);
});

// @desc    Get class details
// @route   GET /api/classes/:id
// @access  Private
const getClassDetails = asyncHandler(async (req, res) => {
  const classDetails = await Class.findById(req.params.id)
    .populate('subjects.teacher', 'name')
    .populate('students.student', 'name');

  if (classDetails) {
    res.json(classDetails);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

export { createClass, getClasses, getClassDetails };
