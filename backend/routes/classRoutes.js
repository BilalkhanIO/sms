import express from 'express';
import { createClass, addCourseToClass, enrollStudentInClass } from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), createClass);

router.route('/:id/courses')
  .post(protect, authorize('admin'), addCourseToClass);

router.route('/:id/students')
  .post(protect, authorize('admin'), enrollStudentInClass);

router.route('/:id').get(protect, getClassDetails);

export default router;
