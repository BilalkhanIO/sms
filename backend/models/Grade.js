// models/Grade.js
import mongoose from 'mongoose';

const gradeSchema = mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    assignmentName: {
      type: String,
      required: true,
    },
    grades: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        feedback: String,
      },
    ],
    totalPoints: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
