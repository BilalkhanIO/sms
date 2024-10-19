import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import classRoutes from './classRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import gradeRoutes from './gradeRoutes.js';
import examRoutes from './examRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import fileRoutes from './fileRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/classes', classRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/grades', gradeRoutes);
router.use('/exams', examRoutes);
router.use('/notifications', notificationRoutes);
router.use('/files', fileRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;

