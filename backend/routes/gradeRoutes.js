//routes/gradeRoutes
import express from 'express';
import { getGrades, addGrade, updateGrade } from '../controllers/gradeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getGrades)
  .post(protect, authorize('teacher', 'admin'), addGrade);

router.route('/:id')
  .put(protect, authorize('teacher', 'admin'), updateGrade);

export default router;