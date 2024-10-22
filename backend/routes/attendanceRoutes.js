import express from 'express';
import { recordAttendance, getAttendance, updateAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('teacher'), recordAttendance);

router.route('/:courseId')
  .get(protect, authorize('teacher', 'admin'), getAttendance);

router.route('/:id')
  .put(protect, authorize('teacher'), updateAttendance);

export default router;
