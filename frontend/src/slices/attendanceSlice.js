import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from '../services/attendanceService';

const initialState = {
  attendanceRecords: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getAttendance = createAsyncThunk(
  'attendance/getAll',
  async (classId, thunkAPI) => {
    try {
      return await attendanceService.getAttendance(classId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/record',
  async (attendanceData, thunkAPI) => {
    try {
      return await attendanceService.recordAttendance(attendanceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceRecords = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(markAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendanceRecords.push(action.payload);
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;
