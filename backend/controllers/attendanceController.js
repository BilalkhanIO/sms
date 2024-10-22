import asyncHandler from 'express-async-handler';
import Attendance from '../models/Attendance.js';
import Course from '../models/Course.js';
import Class from '../models/Class.js';

// @desc    Record attendance for a course
// @route   POST /api/attendance
// @access  Private/Teacher
const recordAttendance = asyncHandler(async (req, res) => {
  const { courseId, classId, date, attendanceList } = req.body;

  const course = await Course.findById(courseId);
  const classObj = await Class.findById(classId);

  if (!course || !classObj) {
    res.status(404);
    throw new Error('Course or Class not found');
  }

  const attendance = await Attendance.create({
    courseId,
    classId,
    date,
    attendanceList
  });

  res.status(201).json(attendance);
});

// @desc    Get attendance for a course
// @route   GET /api/attendance/:courseId
// @access  Private/Teacher
const getAttendance = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { startDate, endDate } = req.query;

  const attendance = await Attendance.find({
    courseId,
    date: { $gte: startDate, $lte: endDate }
  }).sort('date');

  res.json(attendance);
});

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private/Teacher
const updateAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { attendanceList } = req.body;

  const attendance = await Attendance.findById(id);

  if (!attendance) {
    res.status(404);
    throw new Error('Attendance record not found');
  }

  attendance.attendanceList = attendanceList;
  const updatedAttendance = await attendance.save();

  res.json(updatedAttendance);
});

const getAttendanceHistory = asyncHandler(async (req, res) => {
  const { courseId, startDate, endDate } = req.query;
  const attendance = await Attendance.find({
    courseId,
    date: { $gte: startDate, $lte: endDate }
  }).sort('date');

  res.json(attendance);
});

const generateAttendanceReport = asyncHandler(async (req, res) => {
  const { courseId, startDate, endDate } = req.query;
  const attendance = await Attendance.find({
    courseId,
    date: { $gte: startDate, $lte: endDate }
  }).sort('date');

  // Process attendance data to generate a report
  const report = processAttendanceData(attendance);

  res.json(report);
});

export { recordAttendance, getAttendance, updateAttendance };
