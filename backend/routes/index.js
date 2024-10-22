import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import classRoutes from './classRoutes.js';
import courseRoutes from './courseRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/classes', classRoutes);
router.use('/courses', courseRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/attendance', attendanceRoutes);

export default router;
