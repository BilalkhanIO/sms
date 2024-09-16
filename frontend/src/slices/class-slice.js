// slices/classSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../services/classService';

const initialState = {
  classes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getClasses = createAsyncThunk('classes/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await classService.getClasses(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createClass = createAsyncThunk('classes/create', async (classData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await classService.createClass(classData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = classSlice.actions;
export default classSlice.reducer;
