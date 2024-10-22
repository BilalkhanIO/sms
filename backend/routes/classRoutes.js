import express from 'express';
import { createClass, addCourseToClass, enrollStudentInClass, getClassById, getClasses, getAllClasses, updateClass, deleteClass } from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getClasses)
  .post(protect, authorize('admin'), createClass);

router.route('/all')
  .get(protect, authorize('admin'), getAllClasses);

router.route('/:id')
  .get(protect, getClassById)
  .put(protect, authorize('admin'), updateClass)
  .delete(protect, authorize('admin'), deleteClass);

router.route('/:id/courses')
  .post(protect, authorize('admin'), addCourseToClass);

router.route('/:id/students')
  .post(protect, authorize('admin'), enrollStudentInClass);

export default router;
