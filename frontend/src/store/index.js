import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import userReducer from '../slices/userSlice'
import classReducer from '../slices/classSlice'
import courseReducer from '../slices/courseSlice'
import attendanceReducer from '../slices/attendanceSlice'
import dashboardReducer from '../slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
    user: userReducer,
    class: classReducer,
    course: courseReducer,
    attendance: attendanceReducer,
  },
})
