// routes/classRoutes.js
import express from 'express';
import { createClass, getClasses, getClassDetails } from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'teacher'), createClass);
router.get('/', protect, getClasses);
router.get('/:id', protect, getClassDetails);

export default router;
