import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import User from '../models/User.js';

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate('teacher', 'name');
  res.json(courses);
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate('teacher', 'name');
  res.json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('teacher', 'name')
    .populate('students', 'name');

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const createCourse = asyncHandler(async (req, res) => {
  const { courseName, description, teacherId } = req.body;

  const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });

  if (!teacher) {
    res.status(400);
    throw new Error('Invalid teacher');
  }

  const course = await Course.create({
    courseName,
    description,
    teacher: teacherId
  });

  res.status(201).json(course);
});

const updateCourse = asyncHandler(async (req, res) => {
  const { courseName, description, teacherId } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.courseName = courseName || course.courseName;
    course.description = description || course.description;
    
    if (teacherId) {
      const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
      if (!teacher) {
        res.status(400);
        throw new Error('Invalid teacher');
      }
      course.teacher = teacherId;
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const assignTeachersToCourse = asyncHandler(async (req, res) => {
  const { teacherIds } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    const teachers = await User.find({ _id: { $in: teacherIds }, role: 'teacher' });
    course.teachers = teachers.map(teacher => teacher._id);
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const enrollStudentsInCourse   = asyncHandler(async (req, res) => {
  const { studentIds } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    const students = await User.find({ _id: { $in: studentIds }, role: 'student' });
    course.students = students.map(student => student._id);
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

const updateCourseSchedule = asyncHandler(async (req, res) => {
  const { courseId, schedule } = req.body;
  const course = await Course.findById(courseId);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  course.schedule = schedule;
  await course.save();

  res.json(course);
});

export { getAllCourses, getCourses, getCourseById, createCourse, updateCourse, deleteCourse, assignTeachersToCourse, enrollStudentsInCourse, updateCourseSchedule };
