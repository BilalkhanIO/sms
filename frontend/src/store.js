// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import classReducer from './slices/classSlice';
import attendanceReducer from './slices/attendanceSlice';
import gradeReducer from './slices/gradeSlice';
import examReducer from './slices/examSlice';
import notificationReducer from './slices/notificationSlice';
import fileReducer from './slices/fileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    class: classReducer,
    attendance: attendanceReducer,
    grade: gradeReducer,
    exam: examReducer,
    notification: notificationReducer,
    file: fileReducer,
  },
});

export default store;