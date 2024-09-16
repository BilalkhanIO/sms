//controllers/dashboardController.js
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Class from '../models/Class.js';

const getDashboardData = asyncHandler(async (req, res) => {
  const { role } = req.user;

  let dashboardData = {};

  if (role === 'admin') {
    const userCount = await User.countDocuments();
    const classCount = await Class.countDocuments();
    dashboardData = { userCount, classCount };
  } else if (role === 'teacher') {
    const classes = await Class.find({ teacher: req.user._id }).populate('students', 'name');
    dashboardData = { classes };
  } else if (role === 'student') {
    const classes = await Class.find({ students: req.user._id }).populate('teacher', 'name');
    dashboardData = { classes };
  }

  res.json(dashboardData);
});

export { getDashboardData };