import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithAuth from '../utils/axiosWithAuth';

export const getDashboardData = createAsyncThunk(
  'dashboard/getData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosWithAuth.get('/api/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {
      totalStudents: 0,
      totalTeachers: 0,
      totalClasses: 0,
      attendanceTrend: [],
      recentActivities: [],
      notices: [],
      schedule: [],
      assignments: [],
      classPerformance: [],
      recentMessages: [],
      quickActions: [],
      performance: [],
      notifications: [],
      children: [],
      childrenPerformance: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'An error occurred';
      });
  },
});

export default dashboardSlice.reducer;
