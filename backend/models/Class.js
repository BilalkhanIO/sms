// models/Class.js
import mongoose from 'mongoose';
import User from './User.js';

const subjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schedule: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

const classSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  batchStartYear: { type: Number, required: true },
  batchEndYear: { type: Number, required: true },
  subjects: [subjectSchema],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Class = mongoose.model('Class', classSchema);

export default Class;
