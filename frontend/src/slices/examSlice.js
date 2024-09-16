// slices/examSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { examService } from '../services/examService';

const initialState = {
  exams: [],
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(examService.createExam.pending, (state) => {
        state.loading = true;
      })
      .addCase(examService.createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.push(action.payload);
      })
      .addCase(examService.createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(examService.getExams.pending, (state) => {
        state.loading = true;
      })
      .addCase(examService.getExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(examService.getExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default examSlice.reducer;

