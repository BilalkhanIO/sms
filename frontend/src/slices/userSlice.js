// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: ''
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
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
