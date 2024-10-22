import asyncHandler from 'express-async-handler';
import Class from '../models/Class.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find({}).populate('teacher', 'name');
  res.json(classes);
});

const getClassById = asyncHandler(async (req, res) => {
  const classObj = await Class.findById(req.params.id)
    .populate('teacher', 'name')
    .populate('students', 'name');

  if (classObj) {
    res.json(classObj);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

const createClass = asyncHandler(async (req, res) => {
  const { className, gradeLevel, teacherId } = req.body;

  const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });

  if (!teacher) {
    res.status(400);
    throw new Error('Invalid teacher');
  }

  const classObj = await Class.create({
    className,
    gradeLevel,
    teacher: teacherId
  });

  res.status(201).json(classObj);
});

const updateClass = asyncHandler(async (req, res) => {
  const { className, gradeLevel, teacherId } = req.body;

  const classObj = await Class.findById(req.params.id);

  if (classObj) {
    classObj.className = className || classObj.className;
    classObj.gradeLevel = gradeLevel || classObj.gradeLevel;
    
    if (teacherId) {
      const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
      if (!teacher) {
        res.status(400);
        throw new Error('Invalid teacher');
      }
      classObj.teacher = teacherId;
    }

    const updatedClass = await classObj.save();
    res.json(updatedClass);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

const deleteClass = asyncHandler(async (req, res) => {
  const classObj = await Class.findById(req.params.id);

  if (classObj) {
    await classObj.remove();
    res.json({ message: 'Class removed' });
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

const addStudentToClass = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.body;
  const classObj = await Class.findById(classId);
  const student = await User.findOne({ _id: studentId, role: 'student' });

  if (!classObj || !student) {
    res.status(404);
    throw new Error('Class or student not found');
  }

  classObj.students.push(studentId);
  await classObj.save();

  res.json(classObj);
});

const removeStudentFromClass = asyncHandler(async (req, res) => {
  const { classId, studentId } = req.body;
  const classObj = await Class.findById(classId);

  if (!classObj) {
    res.status(404);
    throw new Error('Class not found');
  }

  classObj.students = classObj.students.filter(id => id.toString() !== studentId);
  await classObj.save();

  res.json(classObj);
});

const addCourseToClass = asyncHandler(async (req, res) => {
  const { classId, courseId } = req.body;
  const classObj = await Class.findById(classId);
  const course = await Course.findById(courseId);

  if (!classObj || !course) {
    res.status(404);
    throw new Error('Class or course not found');
  }

  classObj.courses.push(courseId);
  await classObj.save();

  res.json(classObj);
});

const removeCourseFromClass = asyncHandler(async (req, res) => {
  const { classId, courseId } = req.body;
  const classObj = await Class.findById(classId);

  if (!classObj) {
    res.status(404);
    throw new Error('Class not found');
  }

  classObj.courses = classObj.courses.filter(id => id.toString() !== courseId);
  await classObj.save();

  res.json(classObj);
});

export { getClasses, getClassById, createClass, updateClass, deleteClass, addStudentToClass, removeStudentFromClass, addCourseToClass, removeCourseFromClass };
