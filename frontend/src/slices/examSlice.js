// slices/examSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import examService from '../services/examService';

const initialState = {
  exams: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getExams = createAsyncThunk(
  'exam/getAll',
  async (classId, thunkAPI) => {
    try {
      return await examService.getExams(classId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createExam = createAsyncThunk(
  'exam/create',
  async (examData, thunkAPI) => {
    try {
      return await examService.createExam(examData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exams = action.payload;
      })
      .addCase(getExams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(createExam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { reset } = examSlice.actions;
export default examSlice.reducer;

