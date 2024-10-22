import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classService from '../services/classService';

export const getClasses = createAsyncThunk('class/getClasses', async (_, thunkAPI) => {
  try {
    return await classService.getClasses();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteClass = createAsyncThunk('class/deleteClass', async (id, thunkAPI) => {
  try {
    await classService.deleteClass(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createClass = createAsyncThunk('class/createClass', async (classData, thunkAPI) => {
  try {
    return await classService.createClass(classData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateClass = createAsyncThunk('class/updateClass', async (classData, thunkAPI) => {
  try {
    return await classService.updateClass(classData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});   

const classSlice = createSlice({
  name: 'class',
  initialState: {
    classes: [],
    isLoading: false,
    error: null,
  },
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
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(classItem => classItem._id !== action.payload);
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateClass.rejected, (state, action) => {
        const index = state.classes.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
      });
  },
});

export default classSlice.reducer;
