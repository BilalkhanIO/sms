// services/notificationService.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/notifications';

export const notificationService = {
  createNotification: createAsyncThunk(
    'notification/create',
    async (notificationData, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, notificationData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  getNotifications: createAsyncThunk(
    'notification/getAll',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  markAsRead: createAsyncThunk(
    'notification/markAsRead',
    async (notificationId, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${API_URL}/${notificationId}/read`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  ),
};