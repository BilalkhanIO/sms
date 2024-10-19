// controllers/attendanceController.js
import asyncHandler from 'express-async-handler';
import Attendance from '../models/Attendance.js';

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
const getAttendance = asyncHandler(async (req, res) => {
  const { classId, date } = req.query;
  const filter = {};
  if (classId) filter.class = classId;
  if (date) filter.date = new Date(date);

  const attendance = await Attendance.find(filter)
    .populate('class', 'name')
    .populate('attendanceData.student', 'name');
  res.json(attendance);
});

// @desc    Record attendance
// @route   POST /api/attendance
// @access  Private/Teacher
const markAttendance = asyncHandler(async (req, res) => {
  const { classId, date, attendanceData } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    { class: classId, date: new Date(date) },
    { attendanceData },
    { new: true, upsert: true }
  );

  await attendance.populate('class', 'name');
  await attendance.populate('attendanceData.student', 'name');

  res.status(201).json(attendance);
});

export { getAttendance, markAttendance };
