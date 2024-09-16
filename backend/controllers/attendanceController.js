//controllers/attendanceController
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
    .populate('student', 'name');
  res.json(attendance);
});

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private/Teacher/Admin
const markAttendance = asyncHandler(async (req, res) => {
  const { classId, studentId, date, status } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    { class: classId, student: studentId, date: new Date(date) },
    { status },
    { new: true, upsert: true }
  );

  res.status(201).json(attendance);
});

export { getAttendance, markAttendance };