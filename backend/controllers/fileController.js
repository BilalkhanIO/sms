// controllers/fileController.js
import asyncHandler from 'express-async-handler';
import File from '../models/File.js';

const uploadFile = asyncHandler(async (req, res) => {
  const { name, path, class: classId, uploadedBy, fileType, size, description } = req.body;

  const file = await File.create({
    name,
    path,
    class: classId,
    uploadedBy,
    fileType,
    size,
    description,
  });

  res.status(201).json(file);
});

const getFiles = asyncHandler(async (req, res) => {
  const { classId } = req.query;

  const files = await File.find({ class: classId })
    .populate('class', 'name')
    .populate('uploadedBy', 'name');

  res.json(files);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    res.status(404);
    throw new Error('File not found');
  }

  await file.remove();

  res.json({ message: 'File removed' });
});

export { uploadFile, getFiles, deleteFile };
