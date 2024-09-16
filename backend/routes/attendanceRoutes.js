//routes/attendanceRoutes
import express from 'express';
import { getAttendance, markAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAttendance)
  .post(protect, authorize('teacher', 'admin'), markAttendance);

export default router;