// services/notificationService.js
import axios from 'axios';

const API_URL = '/api/notifications/';

const getNotifications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createNotification = async (notificationData) => {
  const response = await axios.post(API_URL, notificationData);
  return response.data;
};

const markAsRead = async (id) => {
  const response = await axios.put(`${API_URL}${id}/read`);
  return response.data;
};

const notificationService = {
  getNotifications,
  createNotification,
  markAsRead,
};

export default notificationService;

