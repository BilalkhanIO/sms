// controllers/dashboardController.js
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Class from '../models/Class.js';
import Course from '../models/Course.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import Event from '../models/Event.js';
import Notice from '../models/Notice.js';
import Message from '../models/Message.js';

const getDashboardData = asyncHandler(async (req, res) => {
  const { role } = req.user;

  let dashboardData;

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
  const totalCourses = await Course.countDocuments();

  const attendanceTrend = await Attendance.aggregate([
    { $group: { _id: "$date", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $limit: 30 }
  ]);

  const performanceOverview = await Grade.aggregate([
    { $group: { _id: "$course", avgGrade: { $avg: "$grade" } } },
    { $sort: { avgGrade: -1 } },
    { $limit: 10 }
  ]);

  const recentActivities = await Event.find().sort('-createdAt').limit(10);

  return { totalStudents, totalTeachers, totalClasses, totalCourses, attendanceTrend, performanceOverview, recentActivities };
};

const getTeacherDashboardData = async (teacherId) => {
  const classes = await Class.find({ teacher: teacherId });
  const totalStudents = await User.countDocuments({ role: 'student', class: { $in: classes.map(c => c._id) } });
  const upcomingClasses = await Class.countDocuments({ teacher: teacherId, date: { $gte: new Date() } });

  const classPerformance = await Grade.aggregate([
    { $match: { course: { $in: classes.map(c => c._id) } } },
    { $group: { _id: "$course", avgGrade: { $avg: "$grade" } } },
    { $sort: { avgGrade: -1 } }
  ]);

  const attendanceRate = await Attendance.aggregate([
    { $match: { classId: { $in: classes.map(c => c._id) } } },
    { $unwind: "$attendanceList" },
    { $group: { _id: null, totalPresent: { $sum: { $cond: [{ $eq: ["$attendanceList.status", "Present"] }, 1, 0] } }, total: { $sum: 1 } } },
    { $project: { rate: { $divide: ["$totalPresent", "$total"] } } }
  ]);

  return { totalStudents, upcomingClasses, classPerformance, attendanceRate: attendanceRate[0]?.rate || 0 };
};

const getStudentDashboardData = async (studentId) => {
  const student = await User.findById(studentId);
  const classes = await Class.find({ students: studentId });
  const currentGPA = await calculateGPA(studentId);
  const attendancePercentage = await calculateAttendancePercentage(studentId);
  const upcomingClasses = await Class.countDocuments({ students: studentId, date: { $gte: new Date() } });

  const gradeProgress = await Grade.find({ student: studentId }).sort('date').limit(10);
  const attendanceTrend = await Attendance.find({ 'attendanceList.studentId': studentId }).sort('date').limit(30);

  return { currentGPA, attendancePercentage, upcomingClasses, gradeProgress, attendanceTrend };
};

const getParentDashboardData = async (parentId) => {
  const parent = await User.findById(parentId).populate('children');
  const childrenIds = parent.children.map(child => child._id);

  const childrenAttendance = await Promise.all(
    childrenIds.map(childId => calculateAttendancePercentage(childId))
  );
  const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });

  const childrenPerformance = await Grade.find({ student: { $in: childrenIds } }).sort('date');
  const childrenAttendanceRecords = await Attendance.find({ student: { $in: childrenIds } }).sort('date');
  const recentMessages = await Message.find({ recipient: parentId }).sort('-createdAt').limit(5);
  const schoolNotices = await Notice.find().sort('-createdAt').limit(5);

  return { childrenAttendance, upcomingEvents, childrenPerformance, childrenAttendanceRecords, recentMessages, schoolNotices };
};

export { getDashboardData };
