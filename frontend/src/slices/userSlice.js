// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: '',
  teachers: [],
  error: '',
};

export const getUsers = createAsyncThunk(
  'user/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.toString());
    }
  }
);

export const createUser = createAsyncThunk('user/create', async (userData, thunkAPI) => {
  try {
    return await userService.createUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('user/update', async (userData, thunkAPI) => {
  try {
    return await userService.updateUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (userId, thunkAPI) => {
  try {
    await userService.deleteUser(userId);
    return userId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getTeachers = createAsyncThunk(
  'user/getTeachers',
  async (_, { rejectWithValue }) => {
    try {
      return await userService.getTeachers();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentsByCourse = createAsyncThunk(
  'user/getStudentsByCourse',
  async (courseId, thunkAPI) => {
    try {
      const response = await axiosWithAuth.get(`/api/courses/${courseId}/students`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Failed to fetch users';
        state.users = [];
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || 'Failed to create user';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || 'Failed to update user';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || 'Failed to delete user';
      })
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload;
      })
      .addCase(getTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStudentsByCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentsByCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(getStudentsByCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
