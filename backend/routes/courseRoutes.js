import express from 'express';
import {
  assignTeachersToCourse,
  enrollStudentsInCourse,
  createCourse,
  updateCourse
} from '../controllers/courseController.js';
import { protect, admin, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createCourse);

router.route('/:id')
  .put(protect, admin, updateCourse);

router.route('/:id/teachers')
  .post(protect, admin, assignTeachersToCourse);

router.route('/:id/students')
  .post(protect, admin, enrollStudentsInCourse);

export default router;
