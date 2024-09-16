// slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { notificationService } from '../services/notificationService';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notificationService.createNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(notificationService.createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload);
      })
      .addCase(notificationService.createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(notificationService.getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(notificationService.getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(notificationService.getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(notificationService.markAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n._id === action.payload._id);
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

export default notificationSlice.reducer;

