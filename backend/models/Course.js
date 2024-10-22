import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const attendanceRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Excused'],
    required: true
  },
  comments: String
});

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  attendanceList: [attendanceRecordSchema]
});

const courseSchema = mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedule: [scheduleSchema],
  attendanceRecords: [attendanceSchema]
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
