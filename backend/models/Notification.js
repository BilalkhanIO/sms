// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  notificationType: {
    type: String,
    enum: ['general', 'assignment', 'exam', 'grade', 'attendance'],
    required: true
  },
  relatedResource: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: {
    type: String,
    enum: ['Assignment', 'Exam', 'Grade', 'Attendance'],
    required: function() { return this.relatedResource != null; }
  },
  read: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
