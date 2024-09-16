// routes/classRoutes.js
import express from 'express';
import { getClasses, createClass, updateClass, deleteClass } from '../controllers/classController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getClasses)
  .post(authorize('admin'), createClass);

router.route('/:id')
  .put(authorize('admin'), updateClass)
  .delete(authorize('admin'), deleteClass);

export default router;