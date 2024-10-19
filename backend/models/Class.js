// models/Class.js
import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const subjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: [scheduleSchema],
});

const classSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  batchStartYear: { type: Number, required: true },
  batchEndYear: { type: Number, required: true },
  subjects: [subjectSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedule: [{
    day: String,
    subjects: [{
      subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
      startTime: String,
      endTime: String
    }]
  }]
});

const Class = mongoose.model('Class', classSchema);

export default Class;
