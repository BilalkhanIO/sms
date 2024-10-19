// slices/gradeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gradeService from '../services/gradeService';

const initialState = {
  grades: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const getGrades = createAsyncThunk(
  'grade/getAll',
  async (classId, thunkAPI) => {
    try {
      return await gradeService.getGrades(classId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createGrade = createAsyncThunk(
  'grade/create',
  async (gradeData, thunkAPI) => {
    try {
      return await gradeService.createGrade(gradeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateGrade = createAsyncThunk(
  'grade/update',
  async ({ id, gradeData }, thunkAPI) => {
    try {
      return await gradeService.updateGrade(id, gradeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grades = action.payload;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(createGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grades.push(action.payload);
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      })
      .addCase(updateGrade.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.grades.findIndex(grade => grade._id === action.payload._id);
        if (index !== -1) {
          state.grades[index] = action.payload;
        }
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { reset } = gradeSlice.actions;
export default gradeSlice.reducer;
