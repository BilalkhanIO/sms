// routes/fileRoutes.js
import express from 'express';
import { uploadFile, getFiles, deleteFile } from '../controllers/fileController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('teacher'), uploadFile);
router.get('/', protect, getFiles);
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteFile);

export default router;
