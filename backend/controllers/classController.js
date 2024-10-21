// controllers/classController.js
import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private (Admin, Teacher)
const createClass = asyncHandler(async (req, res) => {
  const { name, description, batchStartYear, batchEndYear, subjects, students } = req.body;

  console.log('Received class data:', JSON.stringify({ name, description, batchStartYear, batchEndYear, subjects, students }, null, 2));

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

  try {
    console.log('Attempting to create new class');
    const newClass = await Class.create({
      name,
      description,
      batchStartYear,
      batchEndYear,
      subjects,
      students
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

const addStudent = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.body;
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $addToSet: { students: studentId } },
    { new: true }
  ).populate('students', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
});

const removeStudent = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.body;
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { students: studentId } },
    { new: true }
  ).populate('students', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
});

const addSubject = asyncHandler(async (req, res) => {
  const { classId, subject } = req.body;
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $push: { subjects: subject } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
});

const removeSubject = asyncHandler(async (req, res) => {
  const { classId, subjectId } = req.body;
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { subjects: { _id: subjectId } } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
});

const updateSubject = asyncHandler(async (req, res) => {
  const { classId, subjectId, updates } = req.body;
  const updatedClass = await Class.findOneAndUpdate(
    { _id: classId, 'subjects._id': subjectId },
    { $set: { 'subjects.$': updates } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class or subject not found');
  }
  res.json(updatedClass);
});

const assignTeacher = asyncHandler(async (req, res) => {
  const { classId, subjectId, teacherId } = req.body;
  const updatedClass = await Class.findOneAndUpdate(
    { _id: classId, 'subjects._id': subjectId },
    { $set: { 'subjects.$.teacher': teacherId } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class or subject not found');
  }
  res.json(updatedClass);
});

const removeTeacher = asyncHandler(async (req, res) => {
  const { classId, subjectId } = req.body;
  const updatedClass = await Class.findOneAndUpdate(
    { _id: classId, 'subjects._id': subjectId },
    { $unset: { 'subjects.$.teacher': '' } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class or subject not found');
  }
  res.json(updatedClass);
});

const updateSchedule = asyncHandler(async (req, res) => {
  const { classId, schedule } = req.body;
  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $set: { schedule: schedule } },
    { new: true }
  ).populate('subjects.teacher', 'name');
  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(updatedClass);
});

const getStudentDetails = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const student = await User.findById(studentId).select('-password');
  
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

const addCourse = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { course } = req.body;

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $push: { courses: course } },
    { new: true }
  ).populate('courses.teacher', 'name');

  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(updatedClass);
});

const removeCourse = asyncHandler(async (req, res) => {
  const { classId, courseId } = req.params;

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { courses: { _id: courseId } } },
    { new: true }
  ).populate('courses.teacher', 'name');

  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(updatedClass);
});

const updateCourse = asyncHandler(async (req, res) => {
  const { classId, courseId } = req.params;
  const updates = req.body;

  const updatedClass = await Class.findOneAndUpdate(
    { _id: classId, 'courses._id': courseId },
    { $set: { 'courses.$': updates } },
    { new: true }
  ).populate('courses.teacher', 'name');

  if (!updatedClass) {
    res.status(404);
    throw new Error('Class or course not found');
  }

  res.json(updatedClass);
});

const enrollStudent = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { studentId } = req.body;

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $addToSet: { students: studentId } },
    { new: true }
  ).populate('students', 'name');

  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(updatedClass);
});

const unenrollStudent = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.params;

  const updatedClass = await Class.findByIdAndUpdate(
    classId,
    { $pull: { students: studentId } },
    { new: true }
  ).populate('students', 'name');

  if (!updatedClass) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(updatedClass);
});

const generateReport = asyncHandler(async (req, res) => {
  const { classId, reportType } = req.params;

  const classData = await Class.findById(classId)
    .populate('students', 'name')
    .populate('courses.teacher', 'name');

  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }

  let report;
  switch (reportType) {
    case 'roster':
      report = {
        className: classData.className,
        students: classData.students.map(student => ({
          id: student._id,
          name: student.name
        })),
        courses: classData.courses.map(course => ({
          id: course._id,
          name: course.name,
          teacher: course.teacher ? course.teacher.name : 'Unassigned'
        }))
      };
      break;
    // Add more report types as needed
    default:
      res.status(400);
      throw new Error('Invalid report type');
  }

  res.json(report);
});

export { createClass, getClasses, getClassDetails, addStudent, removeStudent, addSubject, removeSubject, updateSubject, assignTeacher, removeTeacher, updateSchedule, getStudentDetails, addCourse, removeCourse, updateCourse, enrollStudent, unenrollStudent, generateReport };
