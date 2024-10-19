// routes/attendanceRoutes.js
import express from 'express';
import { markAttendance, getAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher'), markAttendance);
router.get('/', protect, getAttendance);

export default router;
