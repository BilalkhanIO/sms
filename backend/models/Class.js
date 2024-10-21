// models/Class.js
import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const courseSchema = mongoose.Schema({
  courseName: { type: String, required: true },
  description: { type: String },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedule: [scheduleSchema]
});

const classSchema = mongoose.Schema({
  className: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  courses: [courseSchema],
  schedule: [scheduleSchema]
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

export default Class;
