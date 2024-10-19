// controllers/dashboardController.js
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Class from '../models/Class.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import Exam from '../models/Exam.js';
import Assignment from '../models/Assignment.js';
import Event from '../models/Event.js';
import Message from '../models/Message.js';
import Notice from '../models/Notice.js';

const getDashboardData = asyncHandler(async (req, res) => {
  const { role } = req.user;

  let dashboardData = {};

  switch (role) {
    case 'admin':
      dashboardData = await getAdminDashboardData();
      break;
    case 'teacher':
      dashboardData = await getTeacherDashboardData(req.user._id);
      break;
    case 'student':
      dashboardData = await getStudentDashboardData(req.user._id);
      break;
    case 'parent':
      dashboardData = await getParentDashboardData(req.user._id);
      break;
    default:
      res.status(400);
      throw new Error('Invalid user role');
  }

  res.json(dashboardData);
});

const getAdminDashboardData = async () => {
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalTeachers = await User.countDocuments({ role: 'teacher' });
  const totalClasses = await Class.countDocuments();
  const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });

  // Add logic for attendance trend and performance overview
  const attendanceTrend = await Attendance.aggregate([
    { $group: { _id: "$date", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $limit: 7 }
  ]);
  const performanceOverview = await Grade.aggregate([
    { $group: { _id: "$subject", avgGrade: { $avg: "$score" } } }
  ]);

  const recentActivities = await User.find().sort('-createdAt').limit(10);

  return { totalStudents, totalTeachers, totalClasses, upcomingEvents, attendanceTrend, performanceOverview, recentActivities };
};

const getTeacherDashboardData = async (teacherId) => {
  const classes = await Class.find({ teacher: teacherId });
  const totalStudents = await User.countDocuments({ role: 'student', class: { $in: classes.map(c => c._id) } });
  const upcomingClasses = await Class.countDocuments({ teacher: teacherId, date: { $gte: new Date() } });
  const pendingAssignments = await Assignment.countDocuments({ teacher: teacherId, dueDate: { $gte: new Date() } });
  
  // Add logic for class performance and attendance rate
  const classPerformance = await Grade.aggregate([/* ... */]);
  const attendanceRate = await Attendance.aggregate([/* ... */]);

  return { totalStudents, upcomingClasses, pendingAssignments, classPerformance, attendanceRate };
};

const getStudentDashboardData = async (studentId) => {
  const currentGPA = await calculateGPA(studentId);
  const attendancePercentage = await calculateAttendancePercentage(studentId);
  const upcomingAssignments = await Assignment.countDocuments({ students: studentId, dueDate: { $gte: new Date() } });
  const nextClass = await Class.findOne({ students: studentId, date: { $gte: new Date() } }).sort('date');

  const gradeProgress = await Grade.find({ student: studentId }).sort('date');
  const attendanceTrend = await Attendance.find({ student: studentId }).sort('date');
  const assignments = await Assignment.find({ students: studentId }).sort('-dueDate').limit(5);
  const classSchedule = await Class.find({ students: studentId, date: { $gte: new Date() } }).sort('date').limit(7);

  return { currentGPA, attendancePercentage, upcomingAssignments, nextClass, gradeProgress, attendanceTrend, assignments, classSchedule };
};

const getParentDashboardData = async (parentId) => {
  const child = await User.findOne({ parent: parentId, role: 'student' });
  const childGPA = await calculateGPA(child._id);
  const childAttendance = await calculateAttendancePercentage(child._id);
  const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });

  const childPerformance = await Grade.find({ student: child._id }).sort('date');
  const childAttendanceRecords = await Attendance.find({ student: child._id }).sort('date');
  const recentMessages = await Message.find({ recipient: parentId }).sort('-createdAt').limit(5);
  const schoolNotices = await Notice.find().sort('-createdAt').limit(5);

  return { childGPA, childAttendance, upcomingEvents, childPerformance, childAttendanceRecords, recentMessages, schoolNotices };
};

export { getDashboardData };
