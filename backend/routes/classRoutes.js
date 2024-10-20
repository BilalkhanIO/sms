// routes/classRoutes.js
import express from 'express';
import { createClass, getClasses, getClassDetails, addStudent, removeStudent, addSubject, removeSubject } from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'teacher'), createClass);
router.get('/', protect, getClasses);
router.get('/:id', protect, getClassDetails);
router.post('/add-student', protect, authorize('admin', 'teacher'), addStudent);
router.post('/remove-student', protect, authorize('admin', 'teacher'), removeStudent);
router.post('/add-subject', protect, authorize('admin', 'teacher'), addSubject);
router.post('/remove-subject', protect, authorize('admin', 'teacher'), removeSubject);

export default router;
