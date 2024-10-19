import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import dashboardReducer from '../slices/dashboardSlice'
import classReducer from '../slices/classSlice'
import attendanceReducer from '../slices/attendanceSlice'
import gradeReducer from '../slices/gradeSlice'
import examReducer from '../slices/examSlice'
import notificationReducer from '../slices/notificationSlice'
import fileReducer from '../slices/fileSlice'
import userReducer from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    class: classReducer,
    attendance: attendanceReducer,
    grade: gradeReducer,
    exam: examReducer,
    notification: notificationReducer,
    file: fileReducer,
    user: userReducer,
  },
})
