// controllers/notificationController.js
import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';

const createNotification = asyncHandler(async (req, res) => {
  const { title, message, sender, recipients, notificationType, relatedResource, onModel } = req.body;

  const notification = await Notification.create({
    title,
    message,
    sender,
    recipients,
    notificationType,
    relatedResource,
    onModel,
  });

  res.status(201).json(notification);
});

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipients: req.user._id })
    .populate('sender', 'name')
    .sort('-createdAt');

  res.json(notifications);
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  if (!notification.read.includes(req.user._id)) {
    notification.read.push(req.user._id);
    await notification.save();
  }

  res.json({ success: true });
});

export { createNotification, getNotifications, markNotificationAsRead };
