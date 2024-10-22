import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithAuth from '../utils/axiosWithAuth';

export const recordAttendance = createAsyncThunk(
  'attendance/record',
  async (attendanceData, thunkAPI) => {
    try {
      const response = await axiosWithAuth.post('/api/attendance', attendanceData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAttendance = createAsyncThunk(
  'attendance/get',
  async ({ courseId, startDate, endDate }, thunkAPI) => {
    try {
      const response = await axiosWithAuth.get(`/api/attendance/${courseId}`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAttendance = createAsyncThunk(
  'attendance/update',
  async ({ id, attendanceList }, thunkAPI) => {
    try {
      const response = await axiosWithAuth.put(`/api/attendance/${id}`, { attendanceList });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendanceRecords: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recordAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(recordAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendanceRecords.push(action.payload);
      })
      .addCase(recordAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.attendanceRecords.findIndex(record => record._id === action.payload._id);
        if (index !== -1) {
          state.attendanceRecords[index] = action.payload;
        }
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
