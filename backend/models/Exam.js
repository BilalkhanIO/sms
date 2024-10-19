// models/Exam.js
import mongoose from 'mongoose';

const examSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an exam title'],
      trim: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add an exam date'],
    },
    duration: {
      type: Number,
      required: [true, 'Please add exam duration in minutes'],
    },
    totalMarks: {
      type: Number,
      required: [true, 'Please add total marks for the exam'],
    },
    subject: {
      type: String,
      required: [true, 'Please add the subject for the exam'],
    },
    description: String,
    examType: {
      type: String,
      enum: ['midterm', 'final', 'quiz', 'assignment'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
