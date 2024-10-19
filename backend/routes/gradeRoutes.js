// routes/gradeRoutes.js
import express from 'express';
import { createGrade, getGrades, updateGrade } from '../controllers/gradeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher'), createGrade);
router.get('/', protect, getGrades);
router.put('/:id', protect, authorize('teacher'), updateGrade);

export default router;
