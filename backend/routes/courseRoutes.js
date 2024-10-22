import express from 'express';
import {
  assignTeachersToCourse,
  enrollStudentsInCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getAllCourses,
  getCourses
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCourses)
  .post(protect, authorize('admin'), createCourse);

router.route('/all')
  .get(protect, authorize('admin'), getAllCourses);

router.route('/:id')
  .get(protect, getCourseById)
  .put(protect, authorize('admin'), updateCourse)
  .delete(protect, authorize('admin'), deleteCourse);

router.route('/:id/teachers')
  .post(protect, authorize('admin'), assignTeachersToCourse);

router.route('/:id/students')
  .post(protect, authorize('admin'), enrollStudentsInCourse);

export default router;
