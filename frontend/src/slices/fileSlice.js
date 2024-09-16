// slices/fileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fileService } from '../services/fileService';

const initialState = {
  files: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fileService.uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fileService.uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.push(action.payload);
      })
      .addCase(fileService.uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fileService.getFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fileService.getFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fileService.getFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;

