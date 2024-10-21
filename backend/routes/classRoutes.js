// routes/classRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  addCourse,
  removeCourse,
  updateCourse,
  enrollStudent,
  unenrollStudent,
  generateReport
} from '../controllers/classController.js';

const router = express.Router();

router.post('/:classId/courses', protect, authorize('admin', 'teacher'), addCourse);
router.delete('/:classId/courses/:courseId', protect, authorize('admin', 'teacher'), removeCourse);
router.put('/:classId/courses/:courseId', protect, authorize('admin', 'teacher'), updateCourse);
router.post('/:classId/students', protect, authorize('admin', 'teacher'), enrollStudent);
router.delete('/:classId/students/:studentId', protect, authorize('admin', 'teacher'), unenrollStudent);
router.get('/:classId/reports/:reportType', protect, authorize('admin', 'teacher'), generateReport);

export default router;
