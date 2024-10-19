// models/File.js
import mongoose from 'mongoose';

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a file name'],
      trim: true,
    },
    path: {
      type: String,
      required: [true, 'Please add a file path'],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileType: {
      type: String,
      enum: ['document', 'image', 'video', 'audio', 'other'],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model('File', fileSchema);

export default File;
