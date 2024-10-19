import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetAudience: [{ type: String, enum: ['all', 'students', 'teachers', 'parents'] }],
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;

