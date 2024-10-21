import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../services/courseService';

export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (_, { rejectWithValue }) => {
    try {
      return await courseService.getCourses();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
