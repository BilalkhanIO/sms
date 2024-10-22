import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
  classId: {
    type: String,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  schedule: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  }]
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

export default Class;
