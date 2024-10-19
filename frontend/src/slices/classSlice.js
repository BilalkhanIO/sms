// slices/classSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../services/classService';
import { logout } from './authSlice';

const initialState = {
  classes: [],
  selectedClass: null,
  isLoading: false,
  error: null,
};

export const getClasses = createAsyncThunk(
  'class/getClasses',
  async (_, thunkAPI) => {
    try {
      return await classService.getClasses();
    } catch (error) {
      if (error.message === 'No authentication token found' || 
          error.message === 'Authentication failed. Please log in again.') {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getClassDetails = createAsyncThunk(
  'class/getClassDetails',
  async (id, thunkAPI) => {
    try {
      return await classService.getClassDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createClass = createAsyncThunk(
  'class/createClass',
  async (classData, thunkAPI) => {
    try {
      return await classService.createClass(classData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getClassDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(getClassDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default classSlice.reducer;

