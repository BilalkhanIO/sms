// routes/notificationRoutes.js
import express from 'express';
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'teacher'), createNotification);
router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markNotificationAsRead);

export default router;
