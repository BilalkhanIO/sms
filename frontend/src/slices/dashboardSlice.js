import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithAuth from '../utils/axiosWithAuth';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await axiosWithAuth.get('/api/dashboard');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  recentActivities: [],
  data: null, // Ensure this is initialized
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
