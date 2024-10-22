// routes/userRoutes.js
import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', authUser);
router.post('/register', registerUser);

// Protected routes
router.use(protect);

// Admin only routes
router.route('/')
  .get(authorize('admin'), getUsers)
  .post(authorize('admin'), createUser);

router.route('/:id')
  .get(authorize('admin'), getUserById)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

// User profile routes (accessible by the user themselves)
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

export default router;
