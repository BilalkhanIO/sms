// slices/attendanceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendanceService from '../services/attendanceService';

const initialState = {
  attendances: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const markAttendance = createAsyncThunk('attendance/mark', async (attendanceData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await attendanceService.markAttendance(attendanceData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAttendance = createAsyncThunk('attendance/getAll', async (classId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await attendanceService.getAttendance(classId, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendances.push(action.payload);
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.attendances = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = attendanceSlice.actions;
export default attendanceSlice.reducer;
