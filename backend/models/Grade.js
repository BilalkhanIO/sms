import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;

