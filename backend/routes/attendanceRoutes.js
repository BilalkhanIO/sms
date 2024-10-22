import express from 'express';
import { recordAttendance, getAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('teacher'), recordAttendance);

router.route('/:courseId')
  .get(protect, authorize('teacher', 'admin'), getAttendance);

export default router;
