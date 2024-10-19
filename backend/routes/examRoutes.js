// routes/examRoutes.js
import express from 'express';
import { createExam, getExams, getExamById } from '../controllers/examController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher'), createExam);
router.get('/', protect, getExams);
router.get('/:id', protect, getExamById);

export default router;
