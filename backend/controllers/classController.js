// controllers/classController.js
import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';

const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find().populate('teacher', 'name').populate('students', 'name');
  res.status(200).json(classes);
});

const createClass = asyncHandler(async (req, res) => {
  const { name, description, teacher, students } = req.body;

  if (!name || !teacher) {
    res.status(400);
    throw new Error('Please provide class name and teacher');
  }

  const newClass = await Class.create({
    name,
    description,
    teacher,
    students,
  });

  res.status(201).json(newClass);
});

const updateClass = asyncHandler(async (req, res) => {
  const classToUpdate = await Class.findById(req.params.id);

  if (!classToUpdate) {
    res.status(404);
    throw new Error('Class not found');
  }

  const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('teacher', 'name').populate('students', 'name');

  res.status(200).json(updatedClass);
});

const deleteClass = asyncHandler(async (req, res) => {
  const classToDelete = await Class.findById(req.params.id);

  if (!classToDelete) {
    res.status(404);
    throw new Error('Class not found');
  }

  await classToDelete.remove();

  res.status(200).json({ id: req.params.id });
});

export { getClasses, createClass, updateClass, deleteClass };